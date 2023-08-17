import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import checkConnection from '../../utils/authentification';
import { Button } from '@mui/material';
import Food from '../../components/Food/Food';

import './Inventory.scss';
import FoodsList from '../../components/FoodsList/FoodsList';

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
    <div className='inventory'>
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