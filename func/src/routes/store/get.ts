import {Request, Response} from '@google-cloud/functions-framework';
import {UserDataGetResponse, UserDataGetRequest} from '../../util/types';

import {doc,getDoc} from 'firebase/firestore';
import {responseError} from '../../util/constant';
import {db} from '../../util/firebase';

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

export default async function routeStoreGet(
  req: Request,
  res: Response
): Promise<UserDataGetResponse> {
  const body = req.body as UserDataGetRequest;
  const reqDeviceHash = body.deviceHash;

  if (!reqDeviceHash) {
    throw responseError(res, 403, 'Bad Request', 'デバイスハッシュが存在しません');
  }
  console.log(reqDeviceHash);

  const docRef = doc(db, 'users', reqDeviceHash);
  const docSnap = await getDoc(docRef);

  console.log(docSnap.data());
  
  return {
    deviceHash: reqDeviceHash,
    data: {score: 30},
  };
}
