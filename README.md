# aibo でクイズ

aibo に関するクイズと併せて aibo の API を叩いてみよう！

## 目標

- aibo に関するクイズを出題し, ユーザーのアクションに応じて aibo が振る舞いをするようフロントエンドを実装してみよう.
- My Sony ID と aibo を連携できるよう OAuth を学んで, 簡単な認証フローを実装してみよう.
- API の定義とプロジェクトの雛形, 設計がされているので, チームで 協力, 分担 して実際に実装してみよう.

## リポジトリの構成

| パス    | 役割                   |
| ------- | ---------------------- |
| `/app`  | フロントエンドのソース |
| `/docs` | ドキュメント類         |
| `/func` | バックエンドのソース   |

## シーケンス図

### 連携時

```mermaid
sequenceDiagram
  autonumber
	participant app
	participant functions
	participant firestore
	participant My Sony ID
  participant aibo Cloud

	app ->> My Sony ID: 認証のリクエスト
  Note right of app: Auth Request <br /> [redirect]

  loop ユーザーによるログイン
    My Sony ID ->> My Sony ID: My Sony ID を使ったユーザーのログイン
  end

  My Sony ID -->> app: code の発行, リダイレクト
  Note left of My Sony ID: Auth Response

  app ->>+ functions: プリフライトリクエスト (自動)
  functions -->>- app: OK/200

  app ->>+ functions: codeを送る
  Note right of app: Send Grant Code <br /> [`/register`]

  functions ->>+ aibo Cloud: クライアントID, クライアントシークレット, codeを送る
  Note right of functions: Token Request

  aibo Cloud -->>- functions: アクセストークン, リフレッシュトークンなどを返す
  Note left of aibo Cloud: Token Response

  functions ->>+ aibo Cloud: デバイスIDの要求
  Note right of functions: API Request (deviceId)

  aibo Cloud -->>- functions: デバイスIDとニックネームを返す
  Note left of aibo Cloud: Devices[]

  loop デバイスIDの数だけループ

  functions ->>+ firestore: デバイスIDの存在を確認 <br /> (過去に登録したことがある)
  firestore -->>- functions: ストアを返す or 存在しない
  Note left of firestore: FireStore Type | null

  alt ストアが存在する (過去に登録したことがある)
    functions ->> functions: ハッシュとニックネームを保持
    Note left of functions: DeviceInfo

  else ストアが存在しない (初回)
    functions ->> functions: デバイスID + ランダム文字列 でデバイスハッシュを作成
    Note left of functions: string (SHA-256)

    functions ->>+ firestore: ハッシュをキーに, デバイスIDや<br />トークンなどを保存
    Note right of functions: FireStore Type
    firestore -->>- functions: OK/200
   end
  end
  functions ->>- app: ハッシュとニックネームを返す
  Note left of functions: DeviceInfo[]

  app ->> app: ハッシュ, ニックネーム,<br />有効期限と共に保存
  Note right of app: LocalStore Type
```

### API 呼び出し時

```mermaid
sequenceDiagram
  autonumber
	participant app
	participant functions
	participant firestore
	participant My Sony ID
  participant aibo Cloud

  app ->> app: ハッシュとハッシュの有効期限を取得
  alt 1分後 > 有効期限
    app ->> app: ハッシュを破棄
    Note right of app: もう一度連携させる
  end

  app ->>+ functions: API 呼び出し
  Note right of app: Aibo API Request <br /> [`/api`]

  functions ->>+ firestore: ハッシュから <br /> トークン類を取得
  Note right of functions: Get Data

  firestore -->>- functions: トークン類を返す
  Note left of firestore: FireStoreType?

  alt ハッシュが存在しない
    functions ->> app: 403/forbidden
    Note left of functions: Error
  end

  alt トークンが有効期限切れ
    functions ->>+ aibo Cloud: デバイスIDとリフレッシュトークンを使って<br />アクセストークンを再取得
    Note right of functions: Refresh Token Request

    aibo Cloud -->>- functions: 新しいアクセストークンを返す
    Note left of aibo Cloud: string

    functions ->>+ firestore: ディープコピーでアクセストークンの更新
    Note right of functions: Tokens Store Update
    firestore -->>- functions: OK/200
  end

  functions ->>+ aibo Cloud: API 呼び出し
  Note right of functions: Aibo API Request
  aibo Cloud -->>- functions: API の結果を返す
  Note left of aibo Cloud: Aibo API Response

  functions -->>- app: API の結果を返す
  Note left of functions: Aibo API Response
```

### スコア (ユーザーデータ) 取得

```mermaid
sequenceDiagram
  autonumber
	participant app
	participant functions
	participant firestore

  app ->> app: ハッシュとハッシュの有効期限を取得
  alt 1分後 > 有効期限
    app ->> app: ハッシュを破棄
    Note right of app: もう一度連携させる
  end


  app ->>+ functions: データ更新の要求
  Note right of app: User Data Update <br /> [`/store` (GET)]

  alt ハッシュが存在しない
    functions ->> app: 403/forbidden
    Note left of functions: Error
  end

  functions ->>+ firestore: ストアの要求

  firestore -->>- functions: 200/OK
  Note right of functions: User Data

  functions -->>- app: 200/OK
```

### スコア (ユーザーデータ) 登録

```mermaid
sequenceDiagram
  autonumber
	participant app
	participant functions
	participant firestore

  app ->> app: ハッシュとハッシュの有効期限を取得
  alt 1分後 > 有効期限
    app ->> app: ハッシュを破棄
    Note right of app: もう一度連携させる
  end


  app ->>+ functions: ユーザーデータ更新の要求
  Note right of app: User Data Request <br /> [`/store` (POST)]

  alt ハッシュが存在しない
    functions ->> app: 403/forbidden
    Note left of functions: Error
  end

  functions ->>+ firestore: ストアの更新
  Note right of functions: User Data

  firestore -->>- functions: 200/OK

  functions -->>- app: ユーザーデータを返す
  Note left of functions: User Data
```
