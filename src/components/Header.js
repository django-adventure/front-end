import React, { Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const history = useHistory();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <StyledHeader>
      <StyledLink to="/">Digital Wasteland</StyledLink>
      <nav>
        {window.localStorage.getItem('token') ? (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Fragment>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
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
  align-content: flex-start;
  padding: 15px;
  font-family: 'VT323', monospace;

  a,
  button {
    color: #61dafb;
  }

  h1 {
    font-size: 24px;
    margin-top: 0;
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
  &:not(:first-child) {
    margin-left: 15px;
  }
`;
