import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import Ably from 'ably';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../utils/api';
// import './Chat.scss';

function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const { firstname, lastname } = useSelector((state: any) => state.player);
  const [messageInput, setMessageInput] = useState('');
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    axiosInstance.get('messages/', {
      withCredentials: true
    })
      .then(response => {
        console.log('messages', response.data);
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    
    // Initialisation d'Ably avec vos clés d'API (côté client)
    const apiKey = process.env.REACT_APP_ABLY_API_KEY;
    const client = new Ably.Realtime({ key: apiKey });
    setAblyClient(client);

    // Récupérer le canal de chat
    const channel = client.channels.get('chat');

    // Écouter les messages entrants
    channel.subscribe('messages', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    return () => {
      // Fermer la connexion Ably lorsqu'on quitte le composant
      client.close();
    };
  }, []);

  const sendMessage = () => {
    if (ablyClient) {
      const channel = ablyClient.channels.get('chat');
      channel.publish('messages', { text: messageInput, player: { firstname: firstname, lastname: lastname } });
      setMessageInput('');
    }
    
    axiosInstance.post('messages/newMessage', {
      text: messageInput, player: { firstname: firstname, lastname: lastname }
    }, {
      withCredentials: true
    })
      .then(() => {
        console.log('Message successfully pushed');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.player.firstname}: {message.text}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Entrez votre message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}

export default Chat;