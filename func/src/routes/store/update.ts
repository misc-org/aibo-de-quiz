import {Request, Response} from '@google-cloud/functions-framework';
import {
  UserDataUpdateResponse,
  UserDataUpdateRequest,
  UserDataStore,
} from 'util/types';
import {responseError} from 'util/constant';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from 'util/firebase';

/**
 *
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

export default async function routeStoreUpdate(
  req: Request,
  res: Response
): Promise<UserDataUpdateResponse> {
  const body = req.body as UserDataUpdateRequest;
  const reqDeviceHash = body.deviceHash;
  const reqUserData = body.userData as UserDataStore;

  console.log(reqUserData);

  if (!reqDeviceHash) {
    throw responseError(
      res,
      403,
      'Bad Request',
      'デバイスハッシュが存在しません'
    );
  }

  if (typeof reqUserData.score !== 'number') {
    throw responseError(
      res,
      400,
      'Bad Request',
      'scoreは数値のみで受け付けております'
    );
  }

  const UpdateScoreRef = doc(db, 'users', reqDeviceHash);

  setDoc(UpdateScoreRef, reqUserData);

  const docSnap = await getDoc(UpdateScoreRef);
  const data = docSnap.data() as UserDataStore;

  if (!data) {
    throw responseError(
      res,
      404,
      'Not Found',
      'デバイスハッシュが登録されていません'
    );
  }

  return {};
}
