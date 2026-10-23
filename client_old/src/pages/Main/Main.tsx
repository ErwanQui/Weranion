import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect } from 'react';
import { Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, LocationCity, Map, MenuBookOutlined, Person } from '@mui/icons-material';
import './Main.scss';
import Chat from './Chat/Chat';
import PlayersList from './PlayersList/PlayersList';
import { useSelector } from 'react-redux';
import MenuBar from '../../components/MenuBar/MenuBar';
// import ImageComponent from '../Map/MapComponent/MapComponent';
// import { checkConnection } from '../../utils/authentification';

function Main() {
  // checkConnection();
  const navigate = useNavigate();
  const { firstname, lastname, mj } = useSelector((state: any) => state.player);
  console.log('MAIN ENCORE');

  // console.log('test', firstname, lastname, mj);
  
  return (
    <div className='main'>
      {/* {lastname} */}
      <MenuBar></MenuBar>
      { firstname !== '' ? (mj ? 
        <div className='mjMenus'>MJ</div> : null) : null}
      <div className='playContainer'>
        <div className='playingSide'>
          <div className='playWindow'>
            {/* <ImageComponent></ImageComponent> */}
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