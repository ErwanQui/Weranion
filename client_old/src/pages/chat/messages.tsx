// client/src/pages/chat/messages.js

import './styles.module.scss';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

function Messages({ socket }: any) {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null); // Add this

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data: any) => {
      console.log(data);
      // // // // // setMessagesReceived((state: any[]) => [
      // // // // //   ...state,
      // // // // //   {
      // // // // //     message: data.message,
      // // // // //     username: data.username,
      // // // // //     __createdtime__: data.__createdtime__,
      // // // // //   },
      // // // // // ]);
    });

    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  // Add this
  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_100_messages', (last100Messages: any) => {
      console.log('Last 100 messages:', JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      // // // // // setMessagesReceived((state: any) => [...last100Messages, ...state]);
    });

    return () => socket.off('last_100_messages');
  }, [socket]);

  // Add this
  // Scroll to the most recent message
  // // // // // useEffect(() => {
  // // // // //   messagesColumnRef.current.scrollTop =
  // // // // //     messagesColumnRef.current.scrollHeight;
  // // // // // }, [messagesRecieved]);

  // Add this
  function sortMessagesByDate(messages: any) {
    return messages.sort(
      (a: any, b: any) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: any) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    // Add ref to this div
    <div className="messagesColumn" ref={messagesColumnRef}>
      {messagesRecieved.map((msg: any, i: any) => (
        <div className="message" key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="msgMeta">{msg.username}</span>
            <span className="msgMeta">
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className="msgText">{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Messages;
