import { useNavigate } from 'react-router-dom'; // Add this
import React, { useState } from 'react';
import axios from '../../api';
import checkConnection from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, LocationCity, Map, MenuBookOutlined, Person } from '@mui/icons-material';

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
      { (player as PlayerData).mj ? 
        <div className='mjMenus'>MJ</div> : null}
      <div className='playingSide'>

      </div>
      <div className='playerSide'>

      </div>
    </div>
  );
}

export default Main;