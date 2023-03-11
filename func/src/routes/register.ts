import {Request, Response} from '@google-cloud/functions-framework';
import {responseError} from '../util/constant';
import {DeviceInfo} from '../util/types';

/**
 * ## `/register`: デバイス情報を登録する
 *
 * ### code を使ってデバイス情報を登録します
 *
 * - URL: `/register`
 * - Method: GET
 * - Query: code
 * - Response: `DeviceInfo[]`
 *
 * #### State
 *
 * - `code` に app から返された code が入ってます
 *
 * #### What to implement
 *
 * 0. クライアント ID などと `code` を使って, 認可に必要な情報を用意します
 *    - type: `TokensRequest`
 * 1. 用意した情報を使って, aibo Cloud からトークン類を取得します
 *    - method: `tokensRequest -> TokensResponse`
 * 2. 取得したトークン類を使って, aibo Cloud からデバイス情報を取得します
 *    - method: `aiboAPIRequest` -> DeviceRawInfo[]`
 * 3. 以下デバイス ID の数だけループします:
 *    - デバイス ID の存在を確認します
 *      - 存在する: ハッシュとニックネームを保持する
 *      - 存在しない:
 *        - デバイス ID + ランダム文字列でハッシュを生成する
 *        - ハッシュをキーに, デバイス ID やトークンなどを firestore へ保存します
 * 4. ハッシュとニックネームを返します
 *    - type: `DeviceInfo[]`
 *
 *
 * @param req リクエスト
 * @param res レスポンス
 * @returns デバイスを情報を返します
 */
export default function routeRegister(
  req: Request,
  res: Response
): DeviceInfo[] {
  const query = req.query;
  const code = query.code as string | undefined;
  if (!code) {
    throw responseError(res, 400, 'Bad Request', 'code is required.');
  }

  // TODO: ここから実装

  const exampleDeviceInfo: DeviceInfo[] = [
    {
      deviceHash: '1234567890',
      nickname: 'Aibo',
    },
  ];

  return exampleDeviceInfo;
}
