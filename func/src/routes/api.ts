import {Request, Response} from '@google-cloud/functions-framework';
import {responseError} from '../util/constant';
import {AiboAPIResponse} from '../util/types';

/**
 * ## `/api`: aibo Web API を呼び出す
 *
 * ### deviceHash を使って aibo Web API を呼び出し, その結果を返します
 *
 * - URL: `/api/exec`
 * - Method: POST
 * - Query: code
 * - Body: `AiboFuncExecutionRequest`
 * - Response: `AiboAPIResponse`
 *
 * #### State
 *
 * - `aiboAPIRequest` に デバイス ID と API の種類, パラメータが入ってます
 *
 * #### What to implement
 *
 * 1. `aiboAPIRequest` に入っているデバイスハッシュ を使って, firestore からデバイス情報を取得します
 *    - type: `TokensStore | undefined`
 * 2. もしハッシュが存在しない場合は, 403 を返します
 * 3. もしトークンが有効期限切れだった場合, デバイス ID と リフレッシュトークン を使って, トークンを更新します
 *    - method: `tokensRequest -> TokensResponse`
 * 4. 新しいトークン類を firestore に保存します
 *    - type: `TokensStore`
 * 5. トークン類を使って, aibo Web API を呼び出します
 *    - method: `aiboAPIRequest -> AiboAPIResponse`
 * 6. API の結果を返します
 *    - type: `AiboAPIResponse`
 *
 *
 * @param req リクエスト
 * @param res レスポンス
 * @returns aibo Web API の結果を返します
 */
export default function routeAPI(req: Request, res: Response): AiboAPIResponse {
  return {
    result: 'OK',
  };
}
