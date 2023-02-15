import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../server/Model';

export default async function subscriptionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM subscriptions';
    try {
      const subscription = await pool.query(query);
      return res.status(200).json(subscription.rows);
    } catch (error) {
      console.log(error, 'error in subscription query handler');
      return res.status(500).json(error);
    }
  }
}
