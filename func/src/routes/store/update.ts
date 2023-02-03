import {Request, Response} from '@google-cloud/functions-framework';
import {UserDataGetResponse, UserDataUpdateResponse} from '../../util/types';

export default function routeStoreUpdate(
  req: Request,
  res: Response
): UserDataUpdateResponse {
  return {};
}
