import React, { useState, Fragment } from 'react';
import AuthWrapper from './auth.styled';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Header from '../Header';

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
    network: null,
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
      // .post('http://localhost:8000/api/registration/', user)
      .post('https://django-adventure.herokuapp.com/api/registration/', user)
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
        <h1>sign up</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="username"
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
            placeholder="password"
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
            placeholder="confirm password"
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
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </AuthWrapper>
    </Fragment>
  );
}

export default Register;
