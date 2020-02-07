import React from 'react';
import styled from 'styled-components';

function RoomInfo({ user, currentRoom }) {
  return (
    <Wrapper className="scanlines">
      <StyledInfo>
        <div className="top">
          <p className="username">username: {user}</p>
          <p className="current-room">{currentRoom.description}</p>
        </div>
        <p className="players">
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
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  background: #000;
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: #ff9210;
  padding: 10px;
  background-image: radial-gradient(rgba(105, 86, 9, 0.75), black 170%);
  text-shadow: 0 0 5px #c8c8c8;

  &::-webkit-scrollbar {
    width: 0px;
  }

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

  .username,
  .current-room,
  .players {
    margin: 0 0 10px;
    font-size: 22px;
  }

  .players {
    margin: 0;
  }
`;

const Wrapper = styled.div`
  border: 5px solid #566354;
  border-radius: 5px;
  margin-right: 50px;
`;
