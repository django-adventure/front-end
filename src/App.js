import React, { Fragment } from 'react';
import './App.css';
import GlobalStyle from './global-styles';

function App() {
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
