import React from 'react';
import styled from 'styled-components';

function Display({ parse, setFocus }) {
  return (
    <StyledDisplay>
      <form>
        <input
          type="text"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </form>
    </StyledDisplay>
  );
}

export default Display;

const StyledDisplay = styled.div`
  margin-top: 2rem;
  width: 730px;
  height: 450px;
  background: #000;

  form {
    margin: 0;
  }
  input {
    height: 50px;
    border: none;
    width: 100%;
  }
`;
