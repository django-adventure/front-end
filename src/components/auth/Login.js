import React, { useState } from "react";
import AuthWrapper from "./auth.styled";
import styled from "styled-components";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleError = error => {
    setError(error);
    setLoading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:8000/api/login/", user)
      .then(res => {
        console.log(res);
        setLoading(false);
        window.localStorage.setItem("token", res.data.key);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <h1>Sign In</h1>
      <StyledForm onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
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
