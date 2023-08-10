// client/src/pages/chat/index.js

import './styles.module.scss';
import RoomAndUsersColumn from './room-and-users'; // Add this
import SendMessage from './send-message';
import MessagesReceived from './messages';
import React from 'react';

const Chat = ({ username, room, socket }: any) => {
  return (
    <div className="chatContainer">
      {/* Add this */}
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
