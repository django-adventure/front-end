import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './global-styles';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import Game from './components/Game';

function App() {
  return (
    <Fragment>
      <AppWrapper>
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
  font-size: calc(20px + 2vmin);
  width: 1500px;
  min-width: 1300px;
  max-width: 95%;
  margin: 0 auto;
`;
