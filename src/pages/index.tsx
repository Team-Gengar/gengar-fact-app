import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, 'session', status, 'status');
  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('unauthenticated');
      window.location.href = '/login';
    }
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Random fact generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        <li>
          <Link href="/home">Homepage</Link>
        </li>
      </ul>
    </>
  );
}
