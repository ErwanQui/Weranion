import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/api';
import { FoodObject } from '../../models/food.model';

import './FoodsList.scss';
// import { Button, TextField } from '@mui/material';

function FoodsList(props: {
  updateFoodId: React.Dispatch<string>;
}): JSX.Element {
  const { updateFoodId } = props;
  const [foods, updateFoods] = useState([]);
  console.log('foodslist');

  useEffect(() => {
    axiosInstance.get('food', {
      withCredentials: true
    })
      .then(response => {
        updateFoods(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function display(id: string) {
    updateFoodId(id);
  }

  return (
    <div className='foodsList'>
      {
        foods.map((food: FoodObject) => {
          return(
            <div key={food._id} className="listElement" onClick={() => {display(food._id);}}>
              {food.name}
            </div>
          );
        })
      }
    </div>
  );
}

export default FoodsList;