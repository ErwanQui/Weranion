// client/src/App.js

import './App.css';
import { useState } from 'react';
import Home from './pages/home';
// import Chat from './pages/chat';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';
import React from 'react';

const socket = io.connect('http://localhost:4000');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className='App'>
        Weranion
        {/* <Route> */}
          <Route
            path='/'
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          {/* Add this */}
          {/* <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          /> */}
        {/* </Route> */}
      </div>
    </Router>
  );
}

export default App;
