import Axios from 'axios';
import _ from 'lodash';
import type { valueOf } from '../constants';
import { aiboWebAPIFailedReasonData } from '../error/reasons';
import { currentExecutionStatus } from '../store';
import type { DeviceInfo, AiboFuncExecutionRequest, AiboFuncStatusRequest } from '../types/func';
import {
  type AiboAPIs,
  type AiboFuncExecutionResponse,
  type AiboFuncStatusResponse,
  type ExecutionStatusFailed,
  executionStatusList
} from './api';
import { ENVS } from './env';

export const authStatus = {
  none: 'none',
  waiting: 'waiting',
  success: 'success',
  errFetch: 'errFetch',
  errSection: 'errSection',
  alreadyLinked: 'alreadyLinked'
} as const;
export type AuthStatus = (typeof authStatus)[keyof typeof authStatus];

export const aiboFunctionPath = {
  index: '',
  api: 'api',
  store: {
    get: 'store/get',
    update: 'store/update'
  },
  register: 'register'
} as const;

export type AiboFunctionPath = valueOf<typeof aiboFunctionPath>;

export class AiboFuncBroadcaster {
  constructor(private readonly postData: object) {}

  private async connectionTest(): Promise<boolean> {
    let isConnectionValid = false;
    await fetch('https://example.com/', { mode: 'no-cors' })
      .then(() => (isConnectionValid = true))
      .catch(() => (isConnectionValid = false));
    return isConnectionValid;
  }

  public async post2Functions<T>(path: AiboFunctionPath): Promise<T> {
    console.group('AiboAPIBroadcaster -> postToLambdaApp()');
    console.log(' -> postData -> :', this.postData);

    if (!(await this.connectionTest())) {
      console.error('cannot pass connectionTest() => false');
      console.groupEnd();
      console.groupEnd();
      return await Promise.reject(aiboWebAPIFailedReasonData.cannotReachLambda);
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
    const functionUrl = `${ENVS.FUNCTION_URL}/${path}`;

    return await Axios.post(functionUrl, this.postData, {
      headers: {
        mode: 'cors'
      }
    }).then(async (res) => {
      if (res.status === 200) {
        const data = res.data;
        console.log(' <- received JSON <- :\n', data);
        console.groupEnd();

        return await Promise.resolve(data as T);
      } else {
        console.warn(' <- received code <- :', res.status);
        console.groupEnd();

        switch (res.status) {
          case 406:
            return await Promise.reject(aiboWebAPIFailedReasonData.deviceHashNotFound);
          case 429:
            return await Promise.reject(aiboWebAPIFailedReasonData.aiboAPIReturnsBusy);
          case 502:
            return await Promise.reject(aiboWebAPIFailedReasonData.internalLambdaError);
          default:
            return await Promise.reject(aiboWebAPIFailedReasonData.cannotDetectReason);
        }
      }
    });
  }
}

export class AiboAPI<T extends AiboAPIs> {
  constructor(public readonly currentDeviceInfo: DeviceInfo, public readonly api: T) {}

  protected async runExecution(args: object): Promise<AiboFuncExecutionResponse> {
    const postData: AiboFuncExecutionRequest = {
      deviceHash: this.currentDeviceInfo.deviceHash,
      apiId: this.api.apiId,
      args
    };

    return await new AiboFuncBroadcaster(postData).post2Functions<AiboFuncExecutionResponse>('api');
  }

  protected async askStatus(executionId: string): Promise<AiboFuncStatusResponse> {
    const postData: AiboFuncStatusRequest = {
      deviceHash: this.currentDeviceInfo.deviceHash,
      executionId
    };

    return await new AiboFuncBroadcaster(postData).post2Functions<AiboFuncStatusResponse>('api');
  }

  protected async handleFailedStatus(latestStatusResult: AiboFuncStatusResponse): Promise<void> {
    switch (latestStatusResult.status) {
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
}
