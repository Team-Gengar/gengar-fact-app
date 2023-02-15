import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../../components/layout.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Login() {
  const [error, setError] = useState<null | string>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current!.value;
    const enteredPassword = passwordRef.current!.value;
    const result = await signIn('credentials', {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    });
    console.log(result, 'result');
    if (result.error) {
      return setError('Invalid username or password');
    } else if (result.ok) {
      return router.replace('/home');
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <Image
          src='/images/cat-of-fact.png'
          height={200}
          width={205}
          alt="Cat-of-fact logo"
        />
        <h1>Login</h1>
        {error && <div>{error}</div>}
        <form className={styles.loginForm} onSubmit={submitHandler}>
          <input type="text" placeholder="username" ref={usernameRef} />
          <input type="password" placeholder="password" ref={passwordRef} />
          <button type="submit">Login</button>
          <Link href='/register' id={styles.registerNavigationBox}><button id={styles.registerNavigationButton}>Sign Up</button></Link>
        </form>

      </div>
    </>
  );
}

export default Login;
