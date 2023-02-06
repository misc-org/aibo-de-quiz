import { wait } from '$lib/model/constants';
import { aiboWebAPIFailedReasonData } from '$lib/model/error/reasons';
import { currentExecutionStatus } from '$lib/model/store';
import type { DeviceInfo } from '$lib/model/types/func';
import _ from 'lodash';
import { executionStatusList, type AiboFuncStatusResponse, type CognitionAPIs } from '../api';
import { AiboAPI } from '../broadcast';

export class AiboCognitionAPI extends AiboAPI<CognitionAPIs> {
  constructor(public readonly currentDeviceInfo: DeviceInfo, public readonly api: CognitionAPIs) {
    super(currentDeviceInfo, api);
  }

  public async runAPI(maxRequestsNum?: number): Promise<ReturnType<this['api']['result']>> {
    console.group('AiboActionAPI -> runAPI()');

    currentExecutionStatus.set(executionStatusList.requested);

    let executionId = '';

    await this.runExecution({}).then((result) => {
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
      result: {}
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

    await this.handleFailedStatus(latestStatusResult);

    return await Promise.resolve(latestStatusResult.result as ReturnType<this['api']['result']>);
  }
}
