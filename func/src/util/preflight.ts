import {Response} from '@google-cloud/functions-framework';
import {Request} from 'express';

export function handlePreFlight(req: Request, res: Response) {
  console.log('HTTP Method: OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
}
