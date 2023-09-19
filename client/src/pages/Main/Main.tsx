import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import axios from '../../api';
import checkConnection from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, LocationCity, Map, MenuBookOutlined, Person } from '@mui/icons-material';
import Ably from 'ably';
import './Main.scss';
import { PlayerData } from '../../models/playerData.model';
import Chat from './Chat/Chat';
import PlayersList from './PlayersList/PlayersList';
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
      <div className='playContainer'>
        <div className='playingSide'>
          <div className='playWindow'>
          </div>
          <div className='diceThrow'>
            <Fab size="small" color="brown"
              onClick={() => navigate('/main')}>
              <HomeOutlined/>
            </Fab>
          </div>
        </div>
        <div className='playersSide'>
          <PlayersList></PlayersList>
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
}

export default Main;