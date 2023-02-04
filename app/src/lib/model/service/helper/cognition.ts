import { wait } from '$lib/model/constants';
import { AiboWebAPIFailedReasonData } from '$lib/model/error/reasons';
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
  type AiboFuncStatusResponse,
  type CognitionAPIs
} from '../api';
import { AiboFuncBroadcaster } from '../broadcast';

export class AiboCognitionAPI {
  constructor(private currentDeviceInfo: DeviceInfo, private api: CognitionAPIs) {}

  private runExecution(args: ReturnType<ActionAPIs['args']>) {
    const argsUpperCamel = _.mapKeys(args, (value, key) => _.upperFirst(key));

    const postData: AiboFuncExecutionRequest = {
      deviceHash: this.currentDeviceInfo.deviceHash,
      apiId: this.api.apiId,
      args: argsUpperCamel
    };

    return new AiboFuncBroadcaster(postData).post2Functions<AiboFuncExecutionResponse>('api');
  }

  private askStatus(executionId: string) {
    const postData: AiboFuncStatusRequest = {
      deviceHash: this.currentDeviceInfo.deviceHash,
      executionId: executionId
    };

    return new AiboFuncBroadcaster(postData).post2Functions<AiboFuncStatusResponse>('api');
  }

  public async runAPI(
    args: ReturnType<ActionAPIs['args']>,
    maxRequestsNum?: number
  ): Promise<void> {
    console.group('AiboActionAPI -> runAPI()');

    currentExecutionStatus.set(executionStatusList.requested);

    let executionId = '';

    await this.runExecution(args).then((result) => {
      const typedResult = result as AiboFuncExecutionResponse;

      if (typedResult.status === 'FAILED') {
        const reasonInfo = _.filter(AiboWebAPIFailedReasonData, {
          status: typedResult.result.detail
        })[0];
        return Promise.reject(reasonInfo);
      }

      executionId = (result as AiboFuncExecutionResponse).executionId;
    });

    const requestMax = maxRequestsNum ?? 20;
    let latestStatusResult: AiboFuncStatusResponse;
    let requestNum = 1;

    let currentStatusResult: AiboFuncStatusResponse = {
      executionId: executionId,
      status: 'REQUESTED',
      result: ''
    };

    do {
      console.groupCollapsed(`broadcasting has been tried ${requestNum} time(s)`);

      await this.askStatus(executionId).then((result) => {
        currentStatusResult = result as AiboFuncStatusResponse;
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
      case 'SUCCEEDED':
        return Promise.resolve();
      case 'FAILED':
        {
          const result = latestStatusResult.result as ExecutionStatusFailed;
          return Promise.reject(
            _.filter(AiboWebAPIFailedReasonData, {
              status: result.detail
            })[0]
          );
        }
        break;
      case 'REQUESTED':
        currentExecutionStatus.set(executionStatusList.failed);
        return Promise.reject(AiboWebAPIFailedReasonData.cannotReachLambda);

      case 'ACCEPTED':
      case 'IN_PROGRESS':
      case 'TIMEOUT':
        currentExecutionStatus.set(executionStatusList.timeout);
        return Promise.reject(AiboWebAPIFailedReasonData.aiboAPITimeout);

      case 'NONE':
        return Promise.reject(AiboWebAPIFailedReasonData.cannotDetectReason);
    }
  }
}
