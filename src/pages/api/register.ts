import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../server/Model';

// type Data = {
//   name: string;
// };

// send new user details to the db
export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const request = JSON.parse(req.body);
    const { email, password, phone_number, username } = request;
    const values = [username, password, email, phone_number];
    const query = `INSERT INTO user_info (username, password, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING *`;

    try {
      const response = await pool.query(query, values);
      res.status(200).json(response);
    } catch (error) {
      console.log(error, 'error in register handler');
    }
  }
}
