import Axios from 'axios';
import type { valueOf } from '../constants';
import { AiboWebAPIFailedReasonData } from '../error/reasons';
import { ENVS } from './env';

export const AuthStatus = {
  none: 'none',
  waiting: 'waiting',
  success: 'success',
  errFetch: 'errFetch',
  errSection: 'errSection',
  alreadyLinked: 'alreadyLinked'
} as const;
export type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];

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
  constructor(private postData: object) {}

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
      return Promise.reject(AiboWebAPIFailedReasonData.cannotReachLambda);
    }

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

        return Promise.resolve(data as T);
      } else {
        console.warn(' <- received code <- :', res.status);
        console.groupEnd();

        switch (res.status) {
          case 406:
            return Promise.reject(AiboWebAPIFailedReasonData.deviceHashNotFound);
          case 429:
            return Promise.reject(AiboWebAPIFailedReasonData.aiboAPIReturnsBusy);
          case 502:
            return Promise.reject(AiboWebAPIFailedReasonData.internalLambdaError);
          default:
            return Promise.reject(AiboWebAPIFailedReasonData.cannotDetectReason);
        }
      }
    });
  }
}
