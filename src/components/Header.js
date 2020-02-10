import React, { Fragment } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const history = useHistory();
  const pathname = useLocation().pathname;

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <StyledHeader>
      <h1>Digital Wasteland</h1>
      <nav>
        {window.localStorage.getItem('token') ? (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Fragment>
            {pathname !== '/login' && (
              <StyledLink to="/login">LOGIN</StyledLink>
            )}
            {pathname !== '/register' && (
              <StyledLink to="/register">REGISTER</StyledLink>
            )}
          </Fragment>
        )}
      </nav>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
  padding: 15px;
  font-family: 'VT323', monospace;
  color: #00cc33;

  button {
    color: inherit;
  }

  h1 {
    color: inherit;
    font-size: calc(24px + 2vmin);
    margin: 0;
    /* color: #ff9210; */
  }

  .logout {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    font-family: inherit;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  /* color: #ff9210; */
  color: white;
  font-size: calc(10px + 2vmin);

  &:not(:first-child) {
    margin-left: 25px;
  }

  &:hover {
    color: #ff9210;
  }
`;
