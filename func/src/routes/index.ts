import {Request, Response} from '@google-cloud/functions-framework';

export default function index(req: Request, res: Response): void {
  res.send('Hello World!');
}
