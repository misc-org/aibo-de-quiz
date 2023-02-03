import {Response} from '@google-cloud/functions-framework';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

const responseError = (
  res: Response,
  statusCode: number,
  message: string,
  reason: string
): never => {
  console.log(`[!] ${message}`);
  res.status(statusCode).send({
    message: message,
    reason: reason,
  });

  throw Error(message);
};

export {responseError, isProduction};
