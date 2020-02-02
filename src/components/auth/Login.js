import React, { useState } from 'react';
import AuthWrapper from './auth.styled';
import styled from 'styled-components';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleError = (error) => {
    setError(error);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log(user);
  };

  return (
    <AuthWrapper>
      <h1>Sign In</h1>
      <StyledForm onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <button type="submit">Sign In</button>
      </StyledForm>
    </AuthWrapper>
  );
}

export default Login;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 15px;
  }
`;
