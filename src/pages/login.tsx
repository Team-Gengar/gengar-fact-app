import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

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
    if (result.error) {
      return setError('Invalid username or password');
    } else if (result.ok) {
      return router.replace('/');
    }
  };

  return (
    <>
      <h1>Login</h1>
      {error && <div>{error}</div>}
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="username" ref={usernameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
