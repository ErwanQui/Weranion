import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import axios from '../../api';
import checkConnection from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, LocationCity, Map, MenuBookOutlined, Person } from '@mui/icons-material';
import Ably from 'ably';
import './Main.scss';
import { PlayerData } from '../../models/playerData.model';
// import { Button, TextField } from '@mui/material';

function Main() {
  const player = checkConnection();
  const navigate = useNavigate();
  
  return (
    <div className='main'>
      <div className='menuBar'>
        <div className='beginMenus'>
          <Fab size="small" color="brown"
            onClick={() => navigate('/main')}>
            <HomeOutlined/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/treasury')}>
            <AttachMoney/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/inventory')}>
            <MenuBookOutlined/>
          </Fab>
        </div>
        <div className='endMenus'>
          <Fab size="small" color="brown"
            onClick={() => navigate('/')}>
            <LocationCity/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/')}>
            <Map/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/')}>
            <Person/>
          </Fab>
        </div>
      </div>
      { player ? (player.mj ? 
        <div className='mjMenus'>MJ</div> : null) : null}
      <div className='playingSide'>
        <ChatApp></ChatApp>
      </div>
      <div className='playerSide'>
        <Fab></Fab>
      </div>
    </div>
  );
}


function ChatApp() {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    // Initialisation d'Ably avec vos clés d'API (côté client)
    const apiKey = process.env.REACT_APP_ABLY_API_KEY;
    const client = new Ably.Realtime({ key: apiKey });
    setAblyClient(client);

    // Récupérer le canal de chat
    const channel = client.channels.get('chat');

    // Écouter les messages entrants
    channel.subscribe('message', (message) => {
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
      channel.publish('message', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div>
      <h1>Chat en temps réel avec React</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
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

export default Main;