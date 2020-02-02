import React, { useState } from 'react';
import AuthWrapper from './auth.styled';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState({
    password: null,
    non_field_errors: null,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:8000/api/login/', user)
      .then((res) => {
        setLoading(false);
        window.localStorage.setItem('token', res.data.key);
        history.push('/game');
      })
      .catch((err) => {
        // returns an array of all the fields with an error
        const errors = Object.getOwnPropertyNames(err.response.data);
        // create an object that matches the shape we need to pass to setError
        const error = {};
        errors.forEach((e) => (error[e] = err.response.data[e]));
        setError(error);
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
        {error.password &&
          error.password.map((msg) => <span className="error">{msg}</span>)}
        <button type="submit">Sign In</button>
        {error.non_field_errors &&
          error.non_field_errors.map((msg) => (
            <span className="error">{msg}</span>
          ))}
      </form>
    </AuthWrapper>
  );
}

export default Login;
