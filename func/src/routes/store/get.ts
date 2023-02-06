import {Request, Response} from '@google-cloud/functions-framework';
import {UserDataGetResponse} from '../../util/types';

/**
 * ## `/store/get`: ユーザーデータの取得
 *
 * ### deviceHash に結び付けられているユーザーデータを取得します
 *
 * - URL: `/store/get`
 * - Method: GET
 * - Query: code
 * - Body: `UserDataGetRequest`
 * - Response: `UserDataGetResponse`
 *
 * #### State
 *
 * - `userDataGetRequest` に デバイス ID が入ってます
 *
 * #### What to implement
 *
 * 1. `UserDataGetRequest` に入っているデバイスハッシュ を使って, firestore からデバイス情報を取得します
 *    - type: `UserDataStore | undefined`
 * 2. もしハッシュが存在しない場合は, 403 を返します
 * 3. ユーザーデータを返します
 *    - type: `UserDataGetResponse`
 *
 *
 * @param req リクエスト
 * @param res レスポンス
 * @returns ユーザーデータを返します
 */
export default function routeStoreGet(
  req: Request,
  res: Response
): UserDataGetResponse {
  return {
    deviceHash: '********',
    data: {score: 30},
  };
}
