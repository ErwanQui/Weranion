import './App.css';
import { useState } from 'react';
import Home1 from './pages/home';
import Chat from './pages/chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import * as io from 'socket.io-client';
import React from 'react';
import axios from 'axios';

// const socket = io.connect('https://weranion-server.vercel.app');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
    
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await axios.post('/api/submit', formData);
  //     console.log(response.data); // Response from the server
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  return (
    <Router>
      <div className='App'>
        Weranion
        <Routes>
          {/* <Route
            path='/'
            element={
              <Home />
            }
          /> */}
          <Route
            path='/'
            element={
              <Home1
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
              />
            }
          />
          <Route
            path='/chat'
            element={<Chat username={username} room={room} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
