import { useNavigate } from 'react-router-dom'; // Add this
import React from 'react';
import checkConnection from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, MenuBookOutlined } from '@mui/icons-material';

function Main() {
  checkConnection();

  const navigate = useNavigate();
  return (
    <div className='main'>
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
  );
}

export default Main;