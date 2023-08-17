import { useNavigate } from 'react-router-dom'; // Add this
import React, { useState } from 'react';
import axios from '../../api';
import checkConnection from '../../utils/authentification';
import { Button, Fab } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { connect } from 'socket.io-client';
import Food from '../../components/Food/Food';

import './Inventory.scss';
import FoodsList from '../../components/FoodsList/FoodsList';
// import { Button, TextField } from '@mui/material';

function Inventory() {
  checkConnection();

  const navigate = useNavigate();
  const [category, updateCategory] = useState('');
  const [foodId, updateFoodId] = useState('');
  console.log('inventory');

  function switchCategory(category: string) {
    updateCategory(category);
  }

  return (
    <div className='main'>
      <div className='page'>
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
              switch (category) {
              case 'food':
                return (
                  <>
                    <FoodsList updateFoodId={updateFoodId} />
                    {foodId !== '' ? <Food foodId={foodId} /> : null}
                  </>
                );
              default:
                return <></>;
              }
            })()
          }
        </div>

        
      </div>
    </div>
  );
}

export default Inventory;