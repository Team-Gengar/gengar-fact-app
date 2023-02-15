import { useRef, useEffect, useState, createRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../../components/layout.module.css';
import Image from 'next/image';

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/subscriptions');
  const subscriptions = await response.json();
  return { props: { subscriptions } };
}

function Register({
  subscriptions,
}: {
  subscriptions: { subscription_category: string; subscription_id: number }[];
}) {
  const [error, setError] = useState<null | string>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const subRef = useRef([]);
  const router = useRouter();

  useEffect(() => {
    subscriptions.forEach((sub: { subscription_id: number }, i) => {
      subRef.current[i] = subRef.current[i] || createRef();
    });
  }, [subscriptions]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;
    const enteredPhone = phoneRef.current!.value;
    const enteredUsername = usernameRef.current!.value;
    const enteredSub: number[] = [];
    console.log(subRef.current, 'subRef.current');
    console.log(enteredSub, 'before forEach');
    subRef.current.forEach(
      (sub: { current: { checked?: boolean; value?: number } }) => {
        if (sub.current?.checked && sub.current?.value) {
          enteredSub.push(sub.current.value);
        }
      },
    );
    console.log(enteredSub, 'enteredSub');
    if (
      !enteredEmail ||
      !enteredPassword ||
      !enteredPhone ||
      !enteredUsername ||
      !enteredSub.length
    ) {
      return setError('Please fill out all fields');
    }
    try {
      const request = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          phone_number: enteredPhone,
          username: enteredUsername,
          subscriptions: enteredSub,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await request.json();
      if (response?.user_id && response?.subObj) {
        const result = await signIn('credentials', {
          redirect: false,
          username: enteredUsername,
          password: enteredPassword,
        });
        if (result?.error) {
          return setError('Invalid inputs');
        } else if (result?.ok) {
          return router.replace('/');
        }
      }
    } catch (err) {
      console.log('error in fetch request:', err);
    }
  };
  console.log(subscriptions);
  const subList = subscriptions.map(
    (
      sub: { subscription_category: string; subscription_id: number },
      i: number,
    ) => {
      return (
        <label key={i}>
          {sub.subscription_category}
          <input
            key={i}
            type="checkbox"
            value={sub.subscription_id}
            ref={subRef.current[i]}
          />
        </label>
      );
    },
  );

  return (
    <>
      <div className={styles.loginContainer}>
        <Image
          src='/images/cat-of-fact.png'
          height={200}
          width={205}
          alt="Cat-of-fact logo"
        />
        <h1>Register</h1>
        {error && <div>{error}</div>}
        <form className={styles.loginForm} onSubmit={submitHandler}>
          <input type="text" placeholder="username" ref={usernameRef} />
          <input type="email" placeholder="email" ref={emailRef} />
          <input type="password" placeholder="password" ref={passwordRef} />
          <input type="tel" placeholder="phone" ref={phoneRef} />
          {subList}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
