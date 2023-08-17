import { useNavigate } from 'react-router-dom'; // Add this
import React, { useState } from 'react';
import axios from '../../api';
import checkConnection from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { FoodObject } from '../../models/food.model';

// import './Login.scss';
// import { Button, TextField } from '@mui/material';

function Food() {
  const [foods, updateFoods] = useState([]);
  
  axios.get('food', {
    withCredentials: true
  })
    .then(response => {
      updateFoods(response.data);
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div className='main'>
      {
        foods.map((food: FoodObject) => {
          return(
            <div key={food._id}>
              {food.name}  {food.price} 
            </div>
          );
        })
      }
    </div>
  );
}

export default Food;