import React, { useState, useEffect, useRef } from 'react';
import TypedComponent from './Typed';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import image from '../images/scanlines2.png';
import './App.scss';

function Display({ parseText, setFocus, output, setOutput, uuid }) {
  const [command, setCommand] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    const terminal = document.querySelector('.terminal');
    terminal.scrollTop = terminal.scrollHeight;
  });

  useEffect(() => {
    inputEl.current.focus();
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
    <DisplayWrapper className="scanlines">
      <StyledDisplay
        isVisible={isVisible}
        className="terminal"
        onClick={() => inputEl.current.focus()}
      >
        <form onSubmit={handleSubmit}>
          <TypedComponent
            setIsVisible={setIsVisible}
            strings={[
              'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentiu voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
            ]}
          />
          <div className="terminal-input">
            <span>Type 'help for a list of avaliable commands</span>
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
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    width: 0px;
  }

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

    .typed-cursor {
      overflow-wrap: break-word;
      color: red;
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

  .terminal-input {
    visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  }
`;

const DisplayWrapper = styled.div`
  border: 15px solid #7b8e78;
  border-radius: 10px;
  width: 760px;
  height: 450px;
  /* margin-bottom: 2rem; */
`;
