import Axios from 'axios';
import {Response} from 'express';
import {clientId, clientSecret, tenantId} from './auth/env';
import {CredentialType, getAccessTokenResType, resErr} from './constant';

export const getNewCredential = async (): Promise<CredentialType> => {
  console.log('[･] update access Token');
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'client_credentials');
  params.append('scope', 'https://graph.microsoft.com/.default');

  const res = await Axios.post(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    params
  );

  const resData = res.data as getAccessTokenResType;
  const expiresDate = new Date();
  expiresDate.setMinutes(expiresDate.getMinutes() + resData.expires_in);

  const currentCredential = {
    expiresDate,
    accessToken: resData['access_token'],
  };
  console.log(
    `[*] Updated currentCredential =>\n${JSON.stringify(currentCredential)}`
  );

  return currentCredential;
};

export const passOrUpdateCredential = async (
  res: Response,
  currentCredential?: CredentialType
): Promise<CredentialType> => {
  const now = new Date();
  if (currentCredential !== undefined && now < currentCredential.expiresDate) {
    return currentCredential;
  }

  console.log('[･] currentCredential is undefined or expired');

  let newCredential: CredentialType | undefined;

  try {
    newCredential = await getNewCredential();
  } catch (e) {
    if (Axios.isAxiosError(e) && e.response) {
      const errReason = e.response.data;

      throw resErr(
        res,
        e.response.status,
        `Cannot update credential => \n ${JSON.stringify(errReason)}`,
        errReason.error.message
      );
    } else {
      throw resErr(
        res,
        500,
        'Cannot update credential',
        `Cannot detect reasons =>\n${e}}`
      );
    }
  }

  if (newCredential === undefined) {
    throw resErr(
      res,
      500,
      'Cannot update credential',
      'returned new credential is undefined'
    );
  }

  return newCredential;
};
