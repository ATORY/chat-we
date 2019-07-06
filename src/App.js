import React from 'react';
import io from 'socket.io-client';

import logo from './logo.svg';
import './App.css';

const socket = io('http://localhost:9877?token=abc');
socket.on('connect', () => {
  if (socket.connected) {
    socket.on('hello', (msg) => {
      console.log({ msg })
    })
  } else {

  }
  console.log({ connected: socket.connected }); // true
});

socket.on('disconnected', (msg) => {
  console.log({ msg })
})

socket.on('reconnect', (attemptNumber) => {
  console.log({ attemptNumber })
});

socket.on('reconnect_error', (error) => {
  console.log('reconnecting..')
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
  );
}

export default App;
