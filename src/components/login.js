import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import './css/login.css';

function loginUser(credentials) {
 return fetch('http://localhost:1525/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   credentials: 'include',
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const {accessToken} = await loginUser({
      username,
      password
    });
    setToken(accessToken);
    //.push("/login");
    window.location.reload();
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};