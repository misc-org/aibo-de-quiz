import {Request, Response} from '@google-cloud/functions-framework';
import {responseError} from '../util/constant';
import {AiboAPIResponse} from '../util/types';

export default function routeAPI(req: Request, res: Response): AiboAPIResponse {
  return {
    result: 'OK',
  };
}
