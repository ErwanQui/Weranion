import React, { useEffect, useState } from 'react';
import LineTable from '../../../components/LineTable/LineTable';
import { Earnings } from '../../../models/treasury.model';

import './EarningsTable.scss';

function EarningsTable(props:{earnings: Earnings}): JSX.Element {
  const { earnings } = props;
  const properties = {
    widths: [70, 30],
    edit: [false, true],
    centered: [false, true]
  };
  const [totalEarnings, updateTotal] = useState(0);

  useEffect(() => {
    total();
    console.log('total', totalEarnings);
  }, [earnings]);
  
  function total(): void {
    if (earnings) {
      let total = 0;
      earnings.taxes.forEach((transaction) => {
        total += transaction.value;
      });
      earnings.common.forEach((transaction) => {
        total += transaction.value;
      });
      earnings.other.forEach((transaction) => {
        total += transaction.value;
      });
      updateTotal(total);
    } else {
      updateTotal(-1);
    }
  }

  return (
    <div className='earningsBlock'>
      <div className='earningsTitle'>
        <LineTable values={['Gains totaux', totalEarnings]} properties={properties}></LineTable>
      </div>
      <div className='earningsTable'>
        {earnings.taxes.map((transaction, index) => {
          return (<LineTable key={index} id={transaction._id} values={[transaction.name, transaction.value]} properties={properties}></LineTable>);
        })}
        {earnings.common.map((transaction, index) => {
          return (<LineTable key={index} id={transaction._id} values={[transaction.name, transaction.value]} properties={properties}></LineTable>);
        })}
        {earnings.other.map((transaction, index) => {
          return (<LineTable key={index} id={transaction._id} values={[transaction.name, transaction.value]} properties={properties}></LineTable>);
        })}
      </div>
    </div>
  );
}

export default EarningsTable;
