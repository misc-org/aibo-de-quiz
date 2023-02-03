import {HttpFunction} from '@google-cloud/functions-framework';

import _ from 'lodash';
import {responseError} from './util/constant';
import {operation} from './util/routes';

export const main: HttpFunction = async (req, res) => {
  const path = req.path;
  const pathArr = path.split('/');
  const pathId = pathArr[1];
  const method = _.find(operation, {pathId: pathId});

  if (method === undefined) {
    throw responseError(
      res,
      404,
      'Not Found',
      'Specific path not found.  Try to correct the path.'
    );
  }

  try {
    const response = method.method(req, res);
    res.status(200).send(JSON.stringify(response));
  } catch (e) {
    throw responseError(res, 500, 'Internal Server Error', String(e));
  }
};
