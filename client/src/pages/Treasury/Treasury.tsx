import React from 'react';
import checkConnection from '../../utils/authentification';

function Treasury() {
  checkConnection();
  return (
    <div className='main'>
      {/* <Fab size="small" color="brown"
        onClick={() => navigate('/treasury')}>
        <AttachMoney/>
      </Fab> */}
    </div>
  );
}

export default Treasury;