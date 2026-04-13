import React, { useEffect, useState } from 'react';

import './Cell.scss';
import { axiosInstance } from '../../../utils/api';

function Cell(props: {
  id?: string,
  value: string | number,
  width: number,
  centered: boolean,
  editable: boolean
}): JSX.Element {
  const { id, width, centered, editable } = props;
  const [value, updateValue] = useState(props.value);

  useEffect(() => {
    updateValue(props.value);
  }, [props]);

  async function updateTreasurySheet(newValue: number) {
    axiosInstance.post('treasury/updateTransaction', {
      id: id,
      value: newValue
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='cell' style={{width: `${width}%`, textAlign: `${centered ? 'center' : 'left'}` }}>
      {editable ? 
        <input
          type="text"
          value={value}
          onInput={async (event) => {
            const newValue = parseInt(event.currentTarget.value);
            if(value !== newValue && newValue as number >= 0) {
              updateValue(newValue);
              updateTreasurySheet(newValue);
            }
          }}
          style={{textAlign: `${centered ? 'center' : 'left'}`}}/> :
        <>{value}</>}
    </div>
  );
}

export default Cell;