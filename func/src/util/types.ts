type TokensRequest = {
  client_id: string;
  client_secret: string;
  grant_type: 'authorization_code' | 'refresh_token';
  code: string;
};

type TokensResponse = {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  expires_in: 3600;
};

type TokensRevokeRequest = {
  client_id: string;
  client_secret: string;
  token: string;
  token_type_hint: 'refresh_token';
};

type TokensRevokeResponse = Record<string, never>;

type DeviceRawInfo = {
  deviceId: string;
  nickname: string;
};

type DeviceInfo = {
  deviceHash: string;
  nickname: string;
};

type TokensStore = {
  deviceHash: string;
  deviceId: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};

type UserDataStore = {
  deviceHash: string;
  data: {
    score: number;
  };
};

type UserDataUpdateRequest = {
  deviceHash: string;
  userData: UserDataStore;
};

type UserDataUpdateResponse = Record<string, never>;

type UserDataGetRequest = {
  deviceHash: string;
};

type UserDataGetResponse = UserDataStore;

type AiboFuncExecutionRequest = {
  deviceHash: string;
  apiId: string;
  args: object;
};

type AiboFuncStatusRequest = {
  deviceHash: string;
  executionId: string;
};

type AiboAPIResponse = object;

type ResponseType =
  | TokensResponse
  | TokensRevokeResponse
  | UserDataUpdateResponse
  | UserDataGetResponse
  | AiboAPIResponse;

export type {
  TokensRequest,
  TokensResponse,
  TokensRevokeRequest,
  TokensRevokeResponse,
  DeviceInfo,
  DeviceRawInfo,
  TokensStore,
  UserDataStore,
  UserDataUpdateRequest,
  UserDataUpdateResponse,
  UserDataGetRequest,
  UserDataGetResponse,
  AiboFuncExecutionRequest,
  AiboFuncStatusRequest,
  AiboAPIResponse,
  ResponseType,
};
