import { useNavigate } from 'react-router-dom'; // Add this
import React, { useState } from 'react';
import axios from '../../api';
import checkConnection from '../../utils/authentification';
import { Button, Fab } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { connect } from 'socket.io-client';
import Food from '../../components/Food/Food';

import './Inventory.scss';
// import { Button, TextField } from '@mui/material';

function Inventory() {
  checkConnection();

  const navigate = useNavigate();
  const [category, updateCategory] = useState('');
  // const [password, updatePassword] = useState('');
  // const [failed, updateFailed] = useState(false);

  // const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updatePassword(event.target.value);
  // };

  function switchCategory(category: string) {
    updateCategory(category);
  }

  // async function connect() {
  //   axios.post('login/connect', {
  //     username: username,
  //     password: password
  //   }, {
  //     withCredentials: true
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       if (response.data) {
  //         navigate('/main', { replace: true });
  //       } else {
  //         updateFailed(true); 
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       updateFailed(true); 
  //     });
  // }

  return (
    <div className='main'>
      <div className='menusList'>
        <Button className='menuButton' variant="contained" color="sandyBrown" sx={{ bgcolor: 'sandyBrown.light'}} onClick={() => switchCategory('food')}>
          Food
        </Button>
        <Button className='menuButton' variant="contained" color="sandyBrown" sx={{ bgcolor: 'sandyBrown.light'}} onClick={() => switchCategory('food')}>
          Food
        </Button>
      </div>
      <div className="container">
        {
          (() => {
            switch(category) {
            case 'food':
              return(<Food></Food>);
            default:
              return(<></>);
            }})()
        }
      </div>
    </div>
  );
}

export default Inventory;