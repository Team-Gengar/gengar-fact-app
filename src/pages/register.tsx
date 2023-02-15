import { useRef } from 'react';

function Register() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;
    const enteredPhone = phoneRef.current!.value;
    const enteredUsername = usernameRef.current!.value;
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        phone_number: enteredPhone,
        username: enteredUsername,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <input type="tel" placeholder="phone" ref={phoneRef} />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
