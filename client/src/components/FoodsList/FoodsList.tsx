import React, { useEffect, useState } from 'react';
import axios from '../../api';
import { FoodObject } from '../../models/food.model';

import './FoodsList.scss';

function FoodsList(props: {
  updateFoodId: React.Dispatch<string>;
}): JSX.Element {
  const { updateFoodId } = props;
  const [foods, updateFoods] = useState([]);
  console.log('foodslist');

  useEffect(() => {
    axios.get('food', {
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