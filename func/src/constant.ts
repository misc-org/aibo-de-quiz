import {Response} from '@google-cloud/functions-framework';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

type CredentialType = {
  expiresDate: Date;
  accessToken: string;
};

type getAccessTokenResType = {
  token_type: 'Bearer';
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
};

const trimEnd = (str: string, c: string) => {
  c = c ? c : ' ';
  let i = str.length - 1;
  for (; i >= 0 && str.charAt(i) == c; i--);
  return str.substring(0, i + 1);
};

const resErr = (
  res: Response,
  statusCode: number,
  message: string,
  reason: string
): never => {
  console.log(`[!] ${message}`);
  res.status(statusCode).send({
    message: message,
    reason: reason,
  });

  throw Error(message);
};

export {trimEnd, resErr};
export type {CredentialType, getAccessTokenResType};
