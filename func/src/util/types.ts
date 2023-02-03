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

type TokensRevokeResponse = {};

type Devices = {
  deviceId: string;
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
  score: number;
};
