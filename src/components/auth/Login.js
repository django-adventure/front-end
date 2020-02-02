import React, { useState } from 'react';
import AuthWrapper from './auth.styled';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:8000/api/login/', user)
      .then((res) => {
        console.log(res);
        setLoading(false);
        window.localStorage.setItem('token', res.data.key);
        history.push('/game');
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </AuthWrapper>
  );
}

export default Login;
