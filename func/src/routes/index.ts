import {Request, Response} from '@google-cloud/functions-framework';

export default function routeIndex(req: Request, res: Response): string {
  return 'Welcome to backend hell';
}
