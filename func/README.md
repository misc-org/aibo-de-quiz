# aibo-de-quiz-func

“aibo でクイズ” のバックエンド側の処理です

## 目次

<details><summary>クリックして目次を表示</summary><div>

- [aibo-de-quiz-func](#aibo-de-quiz-func)
  - [目次](#目次)
  - [開発環境](#開発環境)
  - [`/register`: デバイス情報を登録する](#register-デバイス情報を登録する)
    - [code を使ってデバイス情報を登録します](#code-を使ってデバイス情報を登録します)
      - [State](#state)
      - [What to implement](#what-to-implement)
  - [`/api`: aibo Web API を呼び出す](#api-aibo-web-api-を呼び出す)
    - [deviceHash を使って aibo Web API を呼び出し, その結果を返します](#devicehash-を使って-aibo-web-api-を呼び出し-その結果を返します)
      - [State](#state-1)
      - [What to implement](#what-to-implement-1)
  - [`/store/get`: ユーザーデータの取得](#storeget-ユーザーデータの取得)
    - [deviceHash に結び付けられているユーザーデータを取得します](#devicehash-に結び付けられているユーザーデータを取得します)
      - [State](#state-2)
      - [What to implement](#what-to-implement-2)
  - [`/store/update`: ユーザーデータの更新](#storeupdate-ユーザーデータの更新)
    - [deviceHash に結び付けられているユーザーデータを更新します](#devicehash-に結び付けられているユーザーデータを更新します)
      - [State](#state-3)
      - [What to implement](#what-to-implement-3)

</div></details>

## 開発環境

```bash
$ npm -g install yarn
$ yarn
$ yarn run watch
```

言語: TypeScript
パッケージ: Express
ホスト: Google Cloud - Functions
データベース: Google Cloud - Firestore

`http://localhost:8080` でデバッグ用のサーバーへアクセスできます

## [`/register`](./src/routes/register.ts): デバイス情報を登録する

### code を使ってデバイス情報を登録します

- URL: `/register`
- Method: GET
- Query: code
- Response: `DeviceInfo[]`

#### State

- `code` に app から返された code が入ってます

#### What to implement

0. クライアント ID などと `code` を使って, 認可に必要な情報を用意します
   - type: `TokensRequest`
1. 用意した情報を使って, aibo Cloud からトークン類を取得します
   - method: `tokensRequest -> TokensResponse`
2. 取得したトークン類を使って, aibo Cloud からデバイス情報を取得します
   - method: `aiboAPIRequest` -> `DeviceRawInfo[]`
3. 以下デバイス ID の数だけループします:
   - デバイス ID の存在を確認します
     - 存在する: ハッシュとニックネームを保持する
     - 存在しない:
       - デバイス ID + ランダム文字列でハッシュを生成する
       - ハッシュをキーに, デバイス ID やトークンなどを firestore へ保存します
4. ハッシュとニックネームを返します
   - type: `DeviceInfo[]`

## [`/api`](./src/routes/api.ts): aibo Web API を呼び出す

### deviceHash を使って aibo Web API を呼び出し, その結果を返します

- URL: `/api/exec`
- Method: POST
- Query: code
- Body: `AiboFuncExecutionRequest`
- Response: `AiboAPIResponse`

#### State

- `aiboAPIRequest` に デバイス ID と API の種類, パラメータが入ってます

#### What to implement

1. `aiboAPIRequest` に入っているデバイスハッシュ を使って, firestore からデバイス情報を取得します
   - type: `TokensStore | undefined`
2. もしハッシュが存在しない場合は, 403 を返します
3. もしトークンが有効期限切れだった場合, デバイス ID と リフレッシュトークン を使って, トークンを更新します
   - method: `tokensRequest -> TokensResponse`
4. 新しいトークン類を firestore に保存します
   - type: `TokensStore`
5. トークン類を使って, aibo Web API を呼び出します
   - method: `aiboAPIRequest -> AiboAPIResponse`
6. API の結果を返します
   - type: `AiboAPIResponse`

## [`/store/get`](./src/routes/store/get.ts): ユーザーデータの取得

### deviceHash に結び付けられているユーザーデータを取得します

- URL: `/store/get`
- Method: GET
- Query: code
- Body: `UserDataGetRequest`
- Response: `UserDataGetResponse`

#### State

- `userDataGetRequest` に デバイス ID が入ってます

#### What to implement

1. `UserDataGetRequest` に入っているデバイスハッシュ を使って, firestore からデバイス情報を取得します
   - type: `UserDataStore | undefined`
2. もしハッシュが存在しない場合は, 403 を返します
3. ユーザーデータを返します
   - type: `UserDataGetResponse`

## [`/store/update`](./src/routes/store/update.ts): ユーザーデータの更新

### deviceHash に結び付けられているユーザーデータを更新します

- URL: `/store/update`
- Method: POST
- Query: code
- Body: `UserDataUpdateRequest`
- Response: `UserDataUpdateResponse`

#### State

- `userDataUpdateRequest` に デバイスハッシュと新しいユーザーデータが入ってます

#### What to implement

1. `UserDataGetRequest` に入っているデバイスハッシュ を使って, firestore からデバイス情報を取得します
   - type: `UserDataStore | undefined`
2. もしハッシュが存在しない場合は, 403 を返します
3. ユーザーデータを更新します
   - type: `UserDataUpdateRequest`
