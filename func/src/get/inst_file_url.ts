import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import _ from 'lodash';
import {CredentialType, resErr} from '../constant';
import Axios from 'axios';
import {
  getContainerName,
  getFilePath,
  filePath2sharingToken,
  getInstUrl,
} from './util';
import {passOrUpdateCredential} from '../access_token';
import {getIsValidRequestedPath} from '../auth/validator';

let currentCredential: CredentialType | undefined = undefined;

export const getInstFileUrl: HttpFunction = async (req, res) => {
  console.log('[*] == Started getFileUrl() ==');

  const path = req.path;

  const containerName = getContainerName(path);
  const filePath = getFilePath(path);

  getIsValidRequestedPath(res, path);
  console.log('[*] Checked valid requested path');

  currentCredential = await passOrUpdateCredential(res, currentCredential);
  console.log('[*] Checked valid currentCredential');

  const sharingToken = filePath2sharingToken(containerName, filePath);
  console.log(`[･] SharingToken: ${sharingToken}`);

  let instUrl: string | undefined = undefined;

  try {
    instUrl = await getInstUrl(sharingToken, currentCredential);
  } catch (e) {
    if (Axios.isAxiosError(e) && e.response) {
      const errReason = e.response.data;

      throw resErr(
        res,
        e.response.status,
        `Cannot get instUrl from sharepoint => \n ${JSON.stringify(errReason)}`,
        errReason.error.message
      );
    } else {
      throw resErr(
        res,
        500,
        'Cannot get instUrl from Graph API',
        'Cannot detect reasons'
      );
    }
  }

  if (instUrl === undefined) {
    throw resErr(
      res,
      500,
      'Internal server error',
      'Returned instUrl is undefined'
    );
  }

  res.redirect(303, instUrl);
};
