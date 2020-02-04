import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Display({ parseText, setFocus, output }) {
  const [command, setCommand] = useState('');

  useEffect(() => {
    const terminal = document.querySelector('.terminal');
    terminal.scrollTop = terminal.scrollHeight;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    parseText(command);
    setCommand('');
  };

  return (
    <StyledDisplay className="terminal">
      <form onSubmit={handleSubmit}>
        <ul>
          {output.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
        <div style={{ display: 'flex' }}>
          <div className="prompt">>>></div>
          <input
            type="text"
            spellCheck="false"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
      </form>
    </StyledDisplay>
  );
}

export default Display;

const StyledDisplay = styled.div`
  margin-right: 0;
  margin-bottom: 2rem;
  width: 730px;
  height: 450px;
  overflow-y: scroll;
  background: #000;
  font-family: monospace;
  padding: 5px;

  .prompt {
    display: flex;
    align-items: center;
    font-size: 17px;
  }

  form {
    margin: 0;

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      list-style-type: none;
      font-size: 17px;
    }

    input {
      background: #000;
      color: white;
      font-family: inherit;
      font-size: 17px;
      outline: none;
      height: 30px;
      border: none;
      flex: 1;
      margin-left: 0.5rem;
    }
  }
`;
