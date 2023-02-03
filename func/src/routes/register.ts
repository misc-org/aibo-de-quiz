import {Request, Response} from '@google-cloud/functions-framework';

export default function register(req: Request, res: Response): void {
  res.send('register called!');
}
