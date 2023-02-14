import { useRef } from 'react';

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    console.log(enteredEmail, enteredPassword, 'login form');
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
