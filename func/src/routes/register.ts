import {Request, Response} from '@google-cloud/functions-framework';
import {DeviceInfo} from '../util/types';

export default function routeRegister(
  req: Request,
  res: Response
): DeviceInfo[] {
  return [
    {
      deviceHash: '1234567890',
      nickname: 'Aibo',
    },
  ];
}
