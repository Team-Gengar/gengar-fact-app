import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../server/Model';
import bcrypt from 'bcryptjs';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log(user, 'user in jwt callback, before if');
  //     if (user) {
  //       console.log(user, 'user in jwt callback');
  //       token.user_id = user.name;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user = token.user_id;
  //     console.log(session, 'session in session callback');
  //     return session;
  //   },
  // },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { username, password } = credentials;
        const query = 'SELECT * FROM user_info WHERE username = $1';
        const value = [username];
        try {
          const user = await pool.query(query, value);
          const valid = await bcrypt.compare(password, user.rows[0].password);
          if (!valid) {
            throw new Error('Invalid username or password');
          } else {
            return { user: user.rows[0].user_id };
          }
        } catch (error) {
          console.log(error, 'error in login handler');
          return null;
        }
      },
    }),
  ],
});
