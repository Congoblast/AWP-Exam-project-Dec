import { useState } from 'react';

import React from 'react';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  //handle the login from authservice, and setstatecount +1 to show you are logged in
  function handleLogin() {
    props.login(username, password);
  }
 
  return (
    <>
      <h1>Login</h1>
      <input onChange={(event) => setUsername(event.target.value)}
        name="username" type="text" placeholder="username"></input><br />
      <input onChange={(event) => setPassword(event.target.value)}
        name="password" type="password" placeholder="password"></input><br />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
