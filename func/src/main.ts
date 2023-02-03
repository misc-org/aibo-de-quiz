import {
  HttpFunction,
  Request,
  Response,
} from '@google-cloud/functions-framework';

import _ from 'lodash';
import index from './routes';
import api from './routes/api';
import register from './routes/register';
import store from './routes/store';
import {responseError} from './util/constant';

const operation: {
  pathId: string;
  method: (req: Request, res: Response) => void;
}[] = [
  {
    pathId: '',
    method: index,
  },
  {
    pathId: 'api',
    method: api,
  },
  {
    pathId: 'store',
    method: store,
  },
  {
    pathId: 'register',
    method: register,
  },
];

export const main: HttpFunction = async (req, res) => {
  const path = req.path;
  const pathArr = path.split('/');
  const pathId = pathArr[1];
  const method = _.find(operation, {pathId: pathId});

  if (method) {
    try {
      method.method(req, res);
    } catch (e) {
      throw responseError(
        res,
        500,
        'Internal Server Error',
        e as unknown as string
      );
    }
  } else {
    res.status(404).send('Not Found');
  }
};
