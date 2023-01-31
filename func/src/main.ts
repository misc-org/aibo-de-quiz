import {HttpFunction} from '@google-cloud/functions-framework';
import _ from 'lodash';
import {pathValidator} from './auth/validator';
import {getInstFileUrl} from './get/inst_file_url';

export let count = 0;

export const main: HttpFunction = async (req, res) => {
  count++;
  console.log(count);

  const path = req.path;
  const pathArr = path.split('/');

  pathValidator(res, path);
  const requestedOperation = `${pathArr[2]}/${pathArr[3]}`;

  const operations = [
    {
      name: 'admin/admin',
      func: () => {},
    },
    {
      name: 'get/inst_file_url',
      func: () => getInstFileUrl(req, res),
    },
  ];

  const operation = _.find(operations, {name: requestedOperation});
  operation?.func();
};
