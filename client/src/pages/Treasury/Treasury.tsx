import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/api';
import { checkConnection } from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { TreasurySheet } from '../../models/treasury.model';

// import './Login.scss';
// import { Button, TextField } from '@mui/material';

function Treasury() {
  checkConnection();

  const year = 1;
  const month = 4;

  const navigate = useNavigate();
  const [treasurySheet, updateTreasurySheet] = useState<TreasurySheet>();
  // const [password, updatePassword] = useState('');
  // const [failed, updateFailed] = useState(false);

  // const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updatePassword(event.target.value);
  // };

  
  useEffect(() => {
    axiosInstance.get('treasury/', {
      params: { year: year, month: month },
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        updateTreasurySheet(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [year, month]);


  // async function connect() {
  //   axios.post('login/connect', {
  //     username: username,
  //     password: password
  //   }, {
  //     withCredentials: true
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       if (response.data) {
  //         navigate('/main', { replace: true });
  //       } else {
  //         updateFailed(true); 
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       updateFailed(true); 
  //     });
  // }

  return (
    <div className='treasury'>
      {treasurySheet ?
        <div>
        Couronnes actuelles: {'to add'} Couronnes initiales: {treasurySheet.beginCrown}
          {treasurySheet.earnings.taxes.map((earning) => {
            return(
              <div key={earning._id}>Taxe: {earning.name} {earning.value}</div>
            );
          })}
          {treasurySheet.earnings.common.map((earning) => {
            return(
              <div key={earning._id}>Taxe: {earning.name} {earning.value}</div>
            );
          })}
          {treasurySheet.earnings.other.map((earning) => {
            return(
              <div key={earning._id}>Taxe: {earning.name} {earning.value}</div>
            );
          })}
          Loss: {treasurySheet.losses.wages.name} {treasurySheet.losses.wages.value}
          Loss: {treasurySheet.losses.maintenance.name} {treasurySheet.losses.maintenance.value}
          Loss: {treasurySheet.losses.commercialPurchases.name} {treasurySheet.losses.commercialPurchases.value}
          {treasurySheet.losses.other.map((loss) => {
            return(
              <div key={loss._id}>Loss: {loss.name} {loss.value}</div>
            );
          })}
        </div>
        : null}
    </div>
  );
}

export default Treasury;