import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import { Button, Fab } from '@mui/material';
import Ably from 'ably';
import axios from '../../../api';
// import './Chat.scss';

function PlayersList() {
  const [playersList, updatePlayersList] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
      
    // Initialisation d'Ably avec vos clés d'API (côté client)
    const apiKey = process.env.REACT_APP_ABLY_API_KEY;
    const client = new Ably.Realtime({ key: apiKey });
    setAblyClient(client);

    // Récupérer le canal de chat
    const channel = client.channels.get('playersList');

    // Écouter les messages entrants
    channel.subscribe('players', (activePlayers) => {
      console.log(activePlayers.data);
      updatePlayersList(activePlayers.data);
    });

    axios.get('activePlayers/list', {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        updatePlayersList(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    return () => {
      // Fermer la connexion Ably lorsqu'on quitte le composant
      client.close();
    };
  }, []);

  return (
    <div>
      <div>
        {playersList.map((playerData, index) => (
          <Button
            variant="contained"
            key={index}
            fullWidth
          >
            <div key={index}>
              {playerData[1]} {playerData[2]}
            </div>
          </Button>
        ))}
      </div>
      {/* <input
        type="text"
        placeholder="Entrez votre message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      /> */}
    </div>
  );
}

export default PlayersList;