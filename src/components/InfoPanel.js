import React from 'react';
import Navigation from './Navigation';
import RoomInfo from './RoomInfo';
import styled from 'styled-components';

const LeftPanel = ({ currentRoom, user, move }) => {
  return (
    <StyledDiv className="scanlines">
      <RoomInfo currentRoom={currentRoom} user={user} />
      <Navigation move={move} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 50px;
`;

export default LeftPanel;
