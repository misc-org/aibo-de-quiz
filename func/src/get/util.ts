import Axios from 'axios';
import _, {trimEnd} from 'lodash';
import {assetBaseUrl, sharingApiBaseUrl} from '../auth/env';
import {containers} from '../auth/users';
import {CredentialType} from '../constant';

const getContainerName = (path: string): string => {
  const pathArr = path.split('/');
  const containerId = pathArr[1];
  const container = _.find(containers, {id: containerId});
  return container!.containerName;
};

const getFilePath = (path: string) => {
  const pathArr = path.split('/');
  const filePathArr = _.slice(pathArr, 4, pathArr.length);
  return filePathArr.join('/');
};

const filePath2sharingToken = (
  containerName: string,
  filePath: string
): string => {
  const targetFilePath = `${assetBaseUrl}/${containerName}/${filePath}`;
  console.log(`[･] TargetFilePath=> ${targetFilePath}`);

  const value = Buffer.from(targetFilePath).toString('base64');
  return 'u!' + trimEnd(value, '=').replace(/\//g, '_').replace(/\+/g, '-');
};

const getInstUrl = async (
  sharingToken: string,
  currentCredential: CredentialType
): Promise<string> => {
  console.log('[･] Getting inst url...');

  const res = await Axios.get(
    `${sharingApiBaseUrl}/${sharingToken}/driveItem`,
    {
      headers: {
        Authorization: `Bearer ${currentCredential?.accessToken}`,
      },
    }
  );

  console.log(
    `[*] GET sharingAPI received successfully =>\n${JSON.stringify(res.data)}`
  );

  return res.data['@microsoft.graph.downloadUrl'];
};

export {getContainerName, getFilePath, filePath2sharingToken, getInstUrl};
