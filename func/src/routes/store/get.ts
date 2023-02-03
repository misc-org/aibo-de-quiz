import {Request, Response} from '@google-cloud/functions-framework';
import {UserDataGetResponse} from '../../util/types';

export default function routeStoreGet(
  req: Request,
  res: Response
): UserDataGetResponse {
  return {
    deviceHash: '********',
    score: 30,
  };
}
