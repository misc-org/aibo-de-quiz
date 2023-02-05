interface TokensRequest {
  client_id: string;
  client_secret: string;
  grant_type: 'authorization_code' | 'refresh_token';
  code: string;
}

interface TokensResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  expires_in: 3600;
}

interface TokensRevokeRequest {
  client_id: string;
  client_secret: string;
  token: string;
  token_type_hint: 'refresh_token';
}

type TokensRevokeResponse = Record<string, never>;

interface DeviceRawInfo {
  deviceId: string;
  nickname: string;
}

interface DeviceInfo {
  deviceHash: string;
  nickname: string;
}

interface TokensStore {
  deviceHash: string;
  deviceId: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

interface UserDataStore {
  deviceHash: string;
  data: {
    score: number;
  };
}

interface UserDataUpdateRequest {
  deviceHash: string;
  userData: UserDataStore;
}

type UserDataUpdateResponse = Record<string, never>;

interface UserDataGetRequest {
  deviceHash: string;
}

type UserDataGetResponse = UserDataStore;

interface AiboFuncExecutionRequest {
  deviceHash: string;
  apiId: string;
  args: object;
}

interface AiboFuncStatusRequest {
  deviceHash: string;
  executionId: string;
}

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
