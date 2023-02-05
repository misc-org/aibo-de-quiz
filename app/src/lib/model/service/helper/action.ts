import { wait } from '$lib/model/constants';
import { aiboWebAPIFailedReasonData } from '$lib/model/error/reasons';
import { currentExecutionStatus } from '$lib/model/store';
import type {
  AiboFuncExecutionRequest,
  AiboFuncStatusRequest,
  DeviceInfo
} from '$lib/model/types/func';
import _ from 'lodash';
import {
  executionStatusList,
  type ActionAPIs,
  type AiboFuncExecutionResponse,
  type ExecutionStatusFailed,
  type AiboFuncStatusResponse
} from '../api';
import { AiboFuncBroadcaster } from '../broadcast';

export class AiboActionAPI {
  constructor(private readonly currentDeviceInfo: DeviceInfo, private readonly api: ActionAPIs) {}

  public async runAPI(
    args: ReturnType<ActionAPIs['args']>,
    maxRequestsNum?: number
  ): Promise<void> {
    console.group('AiboActionAPI -> runAPI()');

    currentExecutionStatus.set(executionStatusList.requested);

    let executionId = '';

    await this.runExecution(args).then((result) => {
      const typedResult = result;

      if (typedResult.status === 'FAILED') {
        const reasonInfo = _.filter(aiboWebAPIFailedReasonData, {
          status: typedResult.result.detail
        })[0];
        return Promise.reject(reasonInfo);
      }

      executionId = result.executionId;
    });

    const requestMax = maxRequestsNum ?? 20;
    let latestStatusResult: AiboFuncStatusResponse;
    let requestNum = 1;

    let currentStatusResult: AiboFuncStatusResponse = {
      executionId,
      status: 'REQUESTED',
      result: ''
    };

    do {
      console.groupCollapsed(`broadcasting has been tried ${requestNum} time(s)`);

      await this.askStatus(executionId).then((result) => {
        currentStatusResult = result;
      });
      console.log('status : ', currentStatusResult.status);

      currentExecutionStatus.set(currentStatusResult.status);
      latestStatusResult = currentStatusResult;

      console.groupEnd();

      if (
        currentStatusResult.status === executionStatusList.succeeded ||
        currentStatusResult.status === executionStatusList.failed
      )
        break;
      await wait(800);

      requestNum++;
    } while (requestNum <= requestMax);

    console.log(`broadcasting finished: ${latestStatusResult.status}`);
    console.groupEnd();

    switch (latestStatusResult.status) {
      case 'SUCCEEDED': {
        await Promise.resolve();
        return;
      }
      case 'FAILED': {
        const result = latestStatusResult.result as ExecutionStatusFailed;
        await Promise.reject(
          _.filter(aiboWebAPIFailedReasonData, {
            status: result.detail
          })[0]
        );
        return;
      }
      case 'REQUESTED':
        currentExecutionStatus.set(executionStatusList.failed);

        await Promise.reject(aiboWebAPIFailedReasonData.cannotReachLambda);
        return;

      case 'ACCEPTED':
      case 'IN_PROGRESS':
      case 'TIMEOUT':
        currentExecutionStatus.set(executionStatusList.timeout);

        await Promise.reject(aiboWebAPIFailedReasonData.aiboAPITimeout);
        return;

      case 'NONE': {
        await Promise.reject(aiboWebAPIFailedReasonData.cannotDetectReason);
      }
    }
  }

  private async runExecution(
    args: ReturnType<ActionAPIs['args']>
  ): Promise<AiboFuncExecutionResponse> {
    const argsUpperCamel = _.mapKeys(args, (value, key) => _.upperFirst(key));

    const postData: AiboFuncExecutionRequest = {
      deviceHash: this.currentDeviceInfo.deviceHash,
      apiId: this.api.apiId,
      args: argsUpperCamel
    };

    return await new AiboFuncBroadcaster(postData).post2Functions<AiboFuncExecutionResponse>('api');
  }

  private async askStatus(executionId: string): Promise<AiboFuncStatusResponse> {
    const postData: AiboFuncStatusRequest = {
      deviceHash: this.currentDeviceInfo.deviceHash,
      executionId
    };

    return await new AiboFuncBroadcaster(postData).post2Functions<AiboFuncStatusResponse>('api');
  }
}
