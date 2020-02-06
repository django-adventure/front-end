import React from 'react';
import styled from 'styled-components';

function RoomInfo({ user, currentRoom }) {
  return (
    <Wrapper>
      <StyledInfo>
        Username: {user} <br />
        Room: {currentRoom.title} <br />
        <p>{currentRoom.description}</p>
        <p>
          Players in room:{' '}
          {currentRoom.players.length
            ? `${currentRoom.players.join(', ')}`
            : 'None'}
        </p>
      </StyledInfo>
    </Wrapper>
  );
}

export default RoomInfo;

const StyledInfo = styled.div`
  height: 100%;
  background: #000;
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: #ff9210;
  padding: 10px;
  background-image: radial-gradient(rgba(105, 86, 9, 0.75), black 170%);
  text-shadow: 0 0 5px #c8c8c8;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: repeating-linear-gradient(
      0deg,
      rgba(black, 0.15),
      rgba(black, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }

  p {
    font-size: 22px;
  }
`;

const Wrapper = styled.div`
  border: 5px solid #7b8e78;
  border-radius: 10px;
  max-width: 760px;
  width: 400px;
  height: 270px;
  margin-right: 80px;
`;
