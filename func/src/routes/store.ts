import {Request, Response} from '@google-cloud/functions-framework';

export default function store(req: Request, res: Response): void {
  res.send('store called!');
}
