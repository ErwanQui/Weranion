import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect } from 'react';
import { Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, LocationCity, Map, MenuBookOutlined, Person } from '@mui/icons-material';
import './Main.scss';
import Chat from './Chat/Chat';
import PlayersList from './PlayersList/PlayersList';
import {  useSelector } from 'react-redux';

function Main() {
  const navigate = useNavigate();
  const { firstname, lastname, mj } = useSelector((state: any) => state.player);
  
  return (
    <div className='main'>
      {lastname}
      <div className='menuBar'>
        <div className='beginMenus'>
          <Fab size="small" color="brown"
            onClick={() => navigate('/main')}>
            <HomeOutlined/>
          </Fab>
          {/* <Fab size="small" color="brown"
            onClick={() => navigate('/treasury')}>
            <AttachMoney/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/inventory')}>
            <MenuBookOutlined/>
          </Fab> */}
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
      { firstname !== '' ? (mj ? 
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