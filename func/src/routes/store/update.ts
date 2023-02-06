import {Request, Response} from '@google-cloud/functions-framework';
import {UserDataGetResponse, UserDataUpdateResponse} from '../../util/types';

/**
 * ## `/store/update`: ユーザーデータの更新
 *
 * ### deviceHash に結び付けられているユーザーデータを更新します
 *
 * - URL: `/store/update`
 * - Method: POST
 * - Query: code
 * - Body: `UserDataUpdateRequest`
 * - Response: `UserDataUpdateResponse`
 *
 * #### State
 *
 * - `userDataUpdateRequest` に デバイスハッシュと新しいユーザーデータが入ってます
 *
 * #### What to implement
 *
 * 1. `UserDataGetRequest` に入っているデバイスハッシュ を使って, firestore からデバイス情報を取得します
 *    - type: `UserDataStore | undefined`
 * 2. もしハッシュが存在しない場合は, 403 を返します
 * 3. ユーザーデータを更新します
 *    - type: `UserDataUpdateRequest`
 *
 *
 * @param req リクエスト
 * @param res レスポンス
 * @returns なし
 */
export default function routeStoreUpdate(
  req: Request,
  res: Response
): UserDataUpdateResponse {
  return {};
}
