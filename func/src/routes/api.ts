import {Request, Response} from '@google-cloud/functions-framework';
import {
  AiboAPIResponse,
  AiboFuncExecutionRequest,
  AiboFuncStatusRequest,
  TokensResponse,
  TokensStore,
} from '../util/types';
import {responseError} from '../util/constant';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../util/firebase';

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
export default async function routeAPI(
  req: Request,
  res: Response
): Promise<AiboAPIResponse> {
  const aiboAPIRequest = req.body as
    | AiboFuncExecutionRequest
    | AiboFuncStatusRequest;
  const reqDeviceHash = aiboAPIRequest.deviceHash;

  if (!reqDeviceHash) {
    throw responseError(
      res,
      403,
      'Bad Request',
      'デバイスハッシュが存在しません'
    );
  }

  const docRef = doc(db, 'info', reqDeviceHash);
  const docSnap = await getDoc(docRef);
  const info = docSnap.data() as TokensStore;

  const TokensRequest = req.body as TokensResponse;
  const Expires_in = TokensRequest.expires_in;

  if (+info.expiresAt > Expires_in) {
    //aibo cloudに問い合わせてアクセストークンを受け取る
    const TokensResponse = await TokensRequest(
      info.deviceHash,
      info.refreshToken
    ); //今はErrorでok
    await getDoc(TokensResponse);

    //firestoreに保存する
    setDoc(docRef, TokensResponse.accessToken);
  }

  //aiboAPIRequestで呼び出し
  const data = await aiboAPIRequest(aiboAPIRequest); //今はErrorでok

  return data;
}
