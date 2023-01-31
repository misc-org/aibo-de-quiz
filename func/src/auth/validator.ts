import _ from 'lodash';
import {containers} from '../constant';
import validator from 'validator';
import {Response} from 'express';
import {resErr} from '../constant';
import {getFilePath} from '../get/util';

export const pathValidator = (res: Response, path: string): void | never => {
  if (path === '/') {
    res.send("Howdy! Here's sharepoint-accessor!");
  }

  const pathArr = path.split('/');
  const containerId = pathArr[1];
  const requestedOperation = `${pathArr[2]}/${pathArr[3]}`;

  if (pathArr.length < 4) {
    throw resErr(res, 400, 'Syntax is invalid', '');
  }
  if (!validator.isUUID(containerId)) {
    throw resErr(res, 400, 'ContainerID is invalid', '');
  }

  const container = _.find(containers, {id: containerId});

  if (container === undefined) {
    throw resErr(res, 403, 'ContainerID not registered', '');
  }

  if (
    requestedOperation !== 'admin/admin' &&
    requestedOperation !== 'get/inst_file_url'
  ) {
    throw resErr(res, 400, 'Requested operation not found', '');
  }

  if (!container.allowedOperations.includes(requestedOperation)) {
    throw resErr(
      res,
      405,
      'Method not allowed',
      'Requested operation not allowed on this containerId'
    );
  }
};

export const getIsValidRequestedPath = (
  res: Response,
  path: string
): void | never => {
  const filePath = getFilePath(path);

  if ((filePath.match(/\./g) || []).length !== 1) {
    throw resErr(
      res,
      400,
      'Syntax is invalid',
      'The number of file extension (period) is not 1'
    );
  }
};
