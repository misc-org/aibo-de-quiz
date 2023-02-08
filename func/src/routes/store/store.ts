import {Request, Response} from '@google-cloud/functions-framework';
import {responseError} from '../../util/constant';
import routeStoreGet from './get';
import routeStoreUpdate from './update';

export default async function routeStore(req: Request, res: Response) {
  const secondPath = req.path.split('/')[2];

  switch (secondPath) {
    case 'get':
      return await routeStoreGet(req, res);
    case 'update':
      return await routeStoreUpdate(req, res);
    case '' || undefined:
      throw responseError(
        res,
        400,
        'Bad Request',
        'Store Operation not specified. Try to add the operation.'
      );
    default:
      throw responseError(
        res,
        403,
        'Forbidden',
        'Specific operation not permitted. Try to check the operation.'
      );
  }
}
