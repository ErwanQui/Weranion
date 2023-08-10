import './App.css';
import { useState } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as io from 'socket.io-client';
import React from 'react';

const socket = io.connect('http://localhost:4000');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className='App'>
        Weranion
        <Routes>
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
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
