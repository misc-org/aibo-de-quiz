import { wait } from '$lib/model/constants';
import { aiboWebAPIFailedReasonData } from '$lib/model/error/reasons';
import { currentExecutionStatus } from '$lib/model/store';
import type { DeviceInfo } from '$lib/model/types/func';
import _ from 'lodash';
import { executionStatusList, type ActionAPIs, type AiboFuncStatusResponse } from '../api';
import { AiboAPI } from '../broadcast';
export class AiboActionAPI extends AiboAPI<ActionAPIs> {
  constructor(public readonly currentDeviceInfo: DeviceInfo, public readonly api: ActionAPIs) {
    super(currentDeviceInfo, api);
  }

  private makeUpperCamelCase(obj: object): object {
    return _.mapKeys(obj, (value, key) => _.upperFirst(key));
  }

  public async runAPI(
    args: ReturnType<this['api']['args']>,
    maxRequestsNum?: number
  ): Promise<void> {
    console.group('AiboActionAPI -> runAPI()');

    currentExecutionStatus.set(executionStatusList.requested);

    let executionId = '';
    const argsWithUpperCamelCase = this.makeUpperCamelCase(args);

    await this.runExecution(argsWithUpperCamelCase).then((result) => {
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

    await Promise.resolve();
  }
}
