import React, { useEffect, useState } from 'react';
import LineTable from '../../../components/LineTable/LineTable';
import { Losses } from '../../../models/treasury.model';

import './LossesTable.scss';

function LossesTable(props:{losses: Losses}): JSX.Element {
  const { losses } = props;
  const properties = {
    widths: [70, 30],
    edit: [false, true],
    centered: [false, true]
  };
  const [totalLosses, updateTotal] = useState(0);

  useEffect(() => {
    total();
    console.log('total', totalLosses);
  }, [losses]);
  
  function total(): void {
    if (losses) {
      let total = 0;
      total -= losses.wages.value;
      total -= losses.maintenance.value;
      total -= losses.commercialPurchases.value;
      losses.other.forEach((transaction) => {
        total -= transaction.value;
      });
      updateTotal(total);
    } else {
      updateTotal(-1);
    }
  }

  return (
    <div className='lossesBlock'>
      <div className='lossesTitle'>
        <LineTable values={['Pertes totales', -totalLosses]} properties={properties}></LineTable>
      </div>
      <div className='lossesTable'>
        <LineTable id={losses.wages._id} values={[losses.wages.name, losses.wages.value]} properties={properties}></LineTable>
        <LineTable id={losses.maintenance._id} values={[losses.maintenance.name, losses.maintenance.value]} properties={properties}></LineTable>
        <LineTable id={losses.commercialPurchases._id} values={[losses.commercialPurchases.name, losses.commercialPurchases.value]} properties={properties}></LineTable>
        {losses.other.map((transaction, index) => {
          return (<LineTable key={index} id={transaction._id} values={[transaction.name, transaction.value]} properties={properties}></LineTable>);
        })}
      </div>
    </div>
  );
}

export default LossesTable;
