import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './global-styles';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import Game from './components/Game';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <Fragment>
      <AppWrapper>
        <Header>
          <StyledLink to="/">Untitled MUD Game</StyledLink>
          <nav>
            {window.localStorage.getItem('token') ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Fragment>
                <StyledLink to="/login">Login</StyledLink>
                <StyledLink to="/register">Register</StyledLink>
              </Fragment>
            )}
          </nav>
        </Header>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Game} />
      </AppWrapper>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  width: 1200px;
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
