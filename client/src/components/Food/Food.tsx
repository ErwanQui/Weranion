import React, { useEffect, useState } from 'react';
import axios from '../../api';
import { FoodObject } from '../../models/food.model';

import './Food.scss';

function Food(props: {
  foodId: string;
}): JSX.Element {
  const { foodId } = props;
  const [food, updateFood] = useState<FoodObject>();
  console.log('food');

  useEffect(() => {
    axios.get('food/id', {
      params: { id: foodId },
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        updateFood(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [foodId]);

  return (
    <div className='food'>
      {
        food ?
          <div key={food._id}>
            Nom : {food.name}, Prix : {food.price}
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