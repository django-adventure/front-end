import React from 'react';
import styled from 'styled-components';

const Navigation = ({ move }) => {
  return (
    <StyledNav>
      <button className="dpad up">ᐃ</button>
      <div>
        <button className="dpad left">ᐊ</button>
        <div className="center"></div>
        <button className="dpad right">ᐅ</button>
      </div>
      <button className="dpad down">ᐁ</button>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  height: 180px;
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #7b8e78;
  border-radius: 50%;

  div {
    align-self: stretch;
    height: 33%;
    display: flex;
    justify-content: space-between;
  }

  .dpad {
    color: #ff9210;
    background-color: #555555;
    width: 33.33%;
    height: 33%;
    border: unset;
    border-radius: 0;
    outline: none;
    font-size: 40px;
  }

  .dpad:active {
    background-color: #444444;
  }

  .left,
  .right,
  .center {
    height: 100%;
  }

  .center {
    width: 33.33%;
    background-color: #555555;
  }

  .up {
    border-bottom: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .left {
    border-right: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .right {
    border-left: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .down {
    border-top: none;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

export default Navigation;
