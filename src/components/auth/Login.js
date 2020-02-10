import React, { useState, Fragment } from 'react';
import AuthWrapper from './auth.styled';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Header from '../Header';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [error, setError] = useState({
    password: null,
    non_field_errors: null,
    network: null,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      // .post('http://localhost:8000/api/login/', user)
      .post('https://django-adventure.herokuapp.com/api/login/', user)
      .then((res) => {
        setLoading(false);
        window.localStorage.setItem('token', res.data.key);
        history.push('/');
      })
      .catch((err) => {
        err.response
          ? setError(err.response.data)
          : setError({ network: err.message });
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Header />

      <AuthWrapper className="scanlines">
        <h1>sign in</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
            autoComplete="username"
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {error.password &&
            error.password.map((errorMessage) => (
              <span key={errorMessage} className="error">
                {errorMessage}
              </span>
            ))}
          <button type="submit">
            {loading ? <BeatLoader size={12} color="#fff" /> : 'submit'}
          </button>
          {error.non_field_errors &&
            error.non_field_errors.map((errorMessage) => (
              <span key={errorMessage} className="error">
                {errorMessage}
              </span>
            ))}
          {error.network && <span className="error">{error.network}</span>}
        </form>
        <div className="bottom-text">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </AuthWrapper>
    </Fragment>
  );
}

export default Login;
