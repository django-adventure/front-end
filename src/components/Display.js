import React, { useState, useEffect, useRef } from 'react';
import TypedComponent from './Typed';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import format from 'date-fns/format';
import './App.scss';

function Display({
  parseText,
  output,
  uuid,
  messageEventHandler,
  isTextCleared,
}) {
  const [command, setCommand] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    // scroll to bottom of terminal after each new output
    const terminal = document.querySelector('.terminal');
    terminal.scrollTop = terminal.scrollHeight;
  });

  useEffect(() => {
    // Put the focus into the terminal on start
    inputEl.current.focus();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    const pusher = new Pusher('e8856c38e8fdac4de7c5', {
      cluster: 'us2',
      forceTLS: true,
    });
    const channel = pusher.subscribe(`p-channel-${uuid}`);
    channel.bind('broadcast', messageEventHandler);
    // eslint-disable-next-line
  }, []);

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
          {!isTextCleared && (
            <TypedComponent
              onComplete={() => {
                setIsVisible(true);
                inputEl.current.focus();
              }}
              strings={[
                "Welcome to The Wasteland. It's not much but it's home now. Here you can traverse and interact with other players in different zones. If you look around you might find something interesting, like a rat-on-a-stick or Jeff's half-eaten donut! Have fun exploring.",
              ]}
            />
          )}
          <div className="terminal-input">
            <span>Type 'help' for a list of avaliable commands</span>
            <ul>
              {output.map((text, index) => {
                const time = text.time
                  ? ` [${format(new Date(text.time), 'iii HH:mm:ss')}]`
                  : '';
                return <li key={index}>{text.output + time}</li>;
              })}
            </ul>
            <div>
              <span>Cameron Alvarado - </span>
              <a href="https://github.com/jonyonson">
                https://github.com/jonyonson
              </a>
              <br />
              <span>Allison Donnelly - </span>
              <a href="https://github.com/jonyonson">
                https://github.com/jonyonson
              </a>
              <br />
              <span>Samir Lilienfeld - </span>
              <a href="https://github.com/jonyonson">
                https://github.com/jonyonson
              </a>
              <br />
              <span>Jonathan Taylor - </span>
              <a href="https://github.com/jonyonson">
                https://github.com/jonyonson
              </a>
              <br />
            </div>
            <div style={{ display: 'flex' }}>
              <div className="prompt">$ ></div>
              <input
                ref={inputEl}
                type="text"
                spellCheck="false"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
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
  font-family: 'VT323', monospace;
  font-size: 22px;
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
      color: lightgreen;
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

  a {
    color: lightgreen;
  }
`;

const DisplayWrapper = styled.div`
  border: 10px solid #566354;
  border-radius: 10px;
  width: 100%;
  height: 430px;
`;
