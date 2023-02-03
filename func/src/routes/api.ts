import {Request, Response} from '@google-cloud/functions-framework';

export default function api(req: Request, res: Response): void {
  res.send('api called!');
}
