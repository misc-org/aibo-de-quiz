import {Request, Response} from '@google-cloud/functions-framework';
import {
  UserDataGetResponse,
  DeviceInfo,
  UserDataGetRequest,
} from '../../util/types';

import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {doc, getDoc} from 'firebase/firestore';
import {responseError} from '../../util/constant';

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
    throw responseError(res, 400, 'Bad Request', 'デバイスハッシュは？');
  }

  const firebaseConfig = {};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //仮のハッシュ値
  const deviceHash = '12345';

  const docRef = doc(db, 'cities', 'SF');

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }

  return {
    deviceHash: reqDeviceHash,
    data: {score: 30},
  };
}
