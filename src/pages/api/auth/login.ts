import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../server/Model';
import bcrypt from 'bcryptjs';

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const query = 'SELECT * FROM user_info WHERE username = $1';
    const value = [username];
    try {
      const user = await pool.query(query, value);
      const valid = await bcrypt.compare(password, user.rows[0].password);
      if (!valid) {
        return res.status(500).json({ error: 'Invalid credentials' });
      } else {
        return res.status(200).json({ user_id: user.rows[0].user_id });
      }
    } catch (error) {
      console.log(error, 'error in login handler');
      return res.status(500).json(error);
    }
  }
}
