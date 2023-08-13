// client/src/pages/home/index.js
import { useNavigate } from 'react-router-dom'; // Add this
import React from 'react';
// import http from httpC;

import './styles.module.scss';

function Home({ username, setUsername, room, setRoom, socket }: { username: any, setUsername: any, room: any, setRoom: any, socket: any }) {

  const navigate = useNavigate(); // Add this

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      // socket.emit('join_room', { username, room });
      // http
    }

    // Redirect to /chat
    navigate('/chat', { replace: true }); // Add this
  };

  function test() {
    const message = 'oooooo'
    console.log(message)
    // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
    socket.emit('join_room', { username, room });
    // setMessage('');
  }

  function test2() {
    const message = 'zzzzzzoo'
    console.log(message)
    // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
    socket.emit('connection', {});
    // setMessage('');
  }

  return (
    <>
    <button
      onClick={test}
    >
      Test
    </button>
    <button
      onClick={test2}
    >
      Test2
    </button>
    <div className="container">
      <div className="formContainer">
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className="input"
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)} // Add this
        />

        <select
          className="input"
          onChange={(e) => setRoom(e.target.value)} // Add this
        >
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom} // Add this
        >
          Join Room
        </button>
      </div>
    </div>
    </>
  );
};

export default Home;