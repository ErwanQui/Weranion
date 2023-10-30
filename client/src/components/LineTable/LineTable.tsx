import React from 'react';

import Cell from './Cell/Cell';
import './LineTable.scss';

function LineTable(props: {
  id?: string
  values: Array<any>,
  properties: any
}): JSX.Element {
  const { id, values, properties } = props;
  console.log('values', values);

  return (
    <div className='lineTable'>
      {values.map((value, index) => {
        return(<Cell
          key={index}
          id={id}
          value={value}
          width={properties.widths[index] ? properties.widths[index] : 50}
          centered={properties.centered[index] ? properties.centered[index] : false}
          editable={properties.edit[index] ? properties.edit[index] : false}/>);
      })}
    </div>
  );
}

export default LineTable;