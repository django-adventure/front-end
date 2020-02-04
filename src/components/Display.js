import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import styled from 'styled-components';

function Display({ parseText, setFocus, output, setOutput, uuid }) {
  const [command, setCommand] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    const terminal = document.querySelector('.terminal');
    terminal.scrollTop = terminal.scrollHeight;
    inputEl.current.focus();
  });

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('e8856c38e8fdac4de7c5', {
      cluster: 'us2',
      forceTLS: true,
    });

    const channel = pusher.subscribe(`p-channel-${uuid}`);
    channel.bind('broadcast', messageEventHandler);
  }, []);

  const messageEventHandler = (data) => {
    console.log(data);
    setOutput((prev) => [...prev, data.message]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    parseText(command);
    setCommand('');
  };

  return (
    <DisplayWrapper>
      <StyledDisplay
        className="terminal"
        onClick={() => inputEl.current.focus()}
      >
        <form onSubmit={handleSubmit}>
          <ul>
            {output.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
          <div style={{ display: 'flex' }}>
            <div className="prompt">$ ></div>
            <input
              ref={inputEl}
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
    </DisplayWrapper>
  );
}

export default Display;

const StyledDisplay = styled.div`
  background: transparent;
  height: 100%;
  overflow-y: scroll;
  background: #000;
  font-family: 'monofont', monospace;
  font-size: 16px;
  color: #18ff62;
  padding: 10px;

  background-image: radial-gradient(rgba(0, 150, 0, 0.75), black 170%);
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

  .prompt {
    display: flex;
    align-items: center;
    font-size: inherit;
  }

  form {
    margin: 0;
    color: inherit;

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      list-style-type: none;
    }

    input {
      background: transparent;
      text-shadow: 0 0 5px #c8c8c8;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      outline: none;
      height: 30px;
      border: none;
      flex: 1;
      margin-left: 0.5rem;
    }
  }
`;

const DisplayWrapper = styled.div`
  border: 15px solid #7b8e78;
  border-radius: 5px;
  width: 730px;
  height: 450px;
  margin-bottom: 2rem;
`;
