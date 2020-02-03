import React, { useState } from 'react';
import AuthWrapper from './auth.styled';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const [error, setError] = useState({
    username: null,
    password1: null,
    non_field_errors: null,
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:8000/api/registration/', user)
      .then((res) => {
        setLoading(false);
        window.localStorage.setItem('token', res.data.key);
        history.push('/game');
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          value={user.username}
          onChange={handleChange}
        />
        {error.username &&
          error.username.map((errorMessage) => (
            <span key={errorMessage} className="error">
              {errorMessage}
            </span>
          ))}
        <input
          name="password1"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={user.password1}
          onChange={handleChange}
        />
        {error.password1 &&
          error.password1.map((errorMessage) => (
            <span key={errorMessage} className="error">
              {errorMessage}
            </span>
          ))}
        <input
          name="password2"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={user.password2}
          onChange={handleChange}
        />
        {error.password2 &&
          error.password2.map((errorMessage) => (
            <span key={errorMessage} className="error">
              {errorMessage}
            </span>
          ))}
        <button type="submit">Sign Up</button>
        {error.non_field_errors &&
          error.non_field_errors.map((errorMessage) => (
            <span key={errorMessage} className="error">
              {errorMessage}
            </span>
          ))}
      </form>
    </AuthWrapper>
  );
}

export default Register;
