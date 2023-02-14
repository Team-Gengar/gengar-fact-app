import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../server/Model';

type Data = {
  name: string;
};

export default function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    res.status(200).json({ name: 'John Doe' });
  }
}
