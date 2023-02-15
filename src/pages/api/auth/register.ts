import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../server/Model';
import bcrypt from 'bcryptjs';
import pgFormat from 'pg-format';

// send new user details to the db
export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, password, phone_number, username, subscriptions } = req.body;
    if (
      !email ||
      !password ||
      !phone_number ||
      !username ||
      !subscriptions ||
      !subscriptions.length
    ) {
      return res.status(500).json({ error: 'Missing required fields' });
    }
    try {
      const hash = await bcrypt.hash(password, 10);
      const values = [username, hash, email, phone_number];
      const query = `INSERT INTO user_info (username, password, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING *`;
      const response = await pool.query(query, values);
      const userObj = response.rows[0];
      const user_id = userObj.user_id;
      const subscriptionValues = subscriptions.map((subscription: number) => [
        user_id,
        subscription,
      ]);
      const formattedValues = subscriptionValues.map((subscription: number[]) =>
        pgFormat('(%L, %L)', ...subscription),
      );
      const subQuery = `INSERT INTO frequency (user_id, subscription_id) VALUES ${formattedValues.join(
        ',',
      )} RETURNING *`;
      const returnedSubs = await pool.query(subQuery);
      const subObj = returnedSubs.rows;
      return res.status(200).json({ subObj, user_id: userObj.user_id });
    } catch (error) {
      console.log(error, 'error in register handler');
      return res.status(500).json(error);
    }
  }
}
