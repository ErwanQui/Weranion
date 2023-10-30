import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/api';
import { checkConnection } from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { FoodObject } from '../../models/food.model';

import './Food.scss';
// import { Button, TextField } from '@mui/material';

function Food(props: {
  foodId: string;
}): JSX.Element {
  const { foodId } = props;
  const [food, updateFood] = useState<FoodObject>();
  // console.log('food');

  useEffect(() => {
    axiosInstance.get('food/id', {
      params: { id: foodId },
      withCredentials: true
    })
      .then(response => {
        // console.log(response.data);
        updateFood(response.data);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [foodId]);

  return (
    <div className='food'>
      {
        food ?
          <div key={food._id}>
            Nom : {food.name}, Stock: {} Prix : {food.price}
            {food.craft.map((material) => {
              return(
                <div key={(material.element as FoodObject)._id}>
                  craft : {(material.element as FoodObject).name}, quantité :  {material.quantity} 
                </div>
              );
            })}
          </div>
          : null
      }
    </div>
  );
}

export default Food;