import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './global-styles';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Fragment>
      <AppWrapper>
        <Header>
          <StyledLink to="/">Untitled MUD Game</StyledLink>
          <nav>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
          </nav>
        </Header>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </AppWrapper>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  width: 1000px;
  max-width: 90%;
  margin: 0 auto;

  a {
    color: #61dafb;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px;

  h1 {
    font-size: 24px;
    margin-top: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:not(:first-child) {
    margin-left: 15px;
  }
`;
