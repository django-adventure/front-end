import React from 'react';
import Navigation from './Navigation';
import RoomInfo from './RoomInfo';
import styled from 'styled-components';

const LeftPanel = ({ currentRoom, user, move }) => {
  return (
    <StyledDiv>
      <RoomInfo currentRoom={currentRoom} user={user} />
      <Navigation move={move} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default LeftPanel;
