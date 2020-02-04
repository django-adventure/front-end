import React from 'react';
import styled from 'styled-components';

function RoomInfo({ user, currentRoom }) {
  return (
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
  );
}

export default RoomInfo;

const StyledInfo = styled.div`
  font-size: 20px;
  width: 400px;
  border: 2px solid #fff;
  border-radius: 2px;
  padding: 1rem;

  p {
    font-size: 16px;
  }
`;
