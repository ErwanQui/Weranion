import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/api';
import { checkConnection } from '../../utils/authentification';
import { Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, LocationCity, Map, MenuBookOutlined, Person } from '@mui/icons-material';
import { TreasurySheet } from '../../models/treasury.model';
import { useSelector } from 'react-redux';
import Ably from 'ably';

import './Treasury.scss';
import EarningsTable from './EarningsTable/EarningsTable';
import LossesTable from './LossesTable/LossesTable';
// import { Button, TextField } from '@mui/material';

function Treasury() {
  checkConnection();

  const year = 1;
  const month = 4;

  const navigate = useNavigate();
  const [treasurySheet, updateTreasurySheet] = useState<TreasurySheet>();
  // const [password, updatePassword] = useState('');
  // const [failed, updateFailed] = useState(false);
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);


  // const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updatePassword(event.target.value);
  // };
  // const { year, month, currentCrown } = useSelector((state: any) => state.data);
  const { currentCrown } = useSelector((state: any) => state.data);

  useEffect(() => {
    axiosInstance.get('treasury/', {
      params: { year: 1, month: 4 },
      withCredentials: true
    })
      .then(response => {
        console.log('treasurySheet', response.data);
        updateTreasurySheet(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [year, month]);

  useEffect(() => {
      
    // Initialisation d'Ably avec vos clés d'API (côté client)
    const apiKey = process.env.REACT_APP_ABLY_API_KEY;
    const client = new Ably.Realtime({ key: apiKey });
    setAblyClient(client);

    // Récupérer le canal de chat
    const channel = client.channels.get('treasury');

    // Écouter les messages entrants
    channel.subscribe('treasurySheet', () => {
      console.log(1);
      axiosInstance.get('treasury/', {
        params: { year: year, month: month },
        withCredentials: true
      })
        .then(treasurySheet => {
          console.log(2);
          console.log('tresury apres ably', treasurySheet.data);
          updateTreasurySheet(treasurySheet.data);
        })
        .catch(error => {
          console.log(error);
        });
    });

    return () => {
      // Fermer la connexion Ably lorsqu'on quitte le composant
      client.close();
    };
  }, []);

  return (
    <div className='treasury'>
      <div className='menuBar'>
        <div className='beginMenus'>
          <Fab size="small" color="brown"
            onClick={() => navigate('/main')}>
            <HomeOutlined/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/treasury')}>
            <AttachMoney/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/inventory')}>
            <MenuBookOutlined/>
          </Fab>
        </div>
        <div className='endMenus'>
          <Fab size="small" color="brown"
            onClick={() => navigate('/')}>
            <LocationCity/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/')}>
            <Map/>
          </Fab>
          <Fab size="small" color="brown"
            onClick={() => navigate('/')}>
            <Person/>
          </Fab>
        </div>
      </div>
      {treasurySheet ?
        <div>
        Couronnes actuelles: {currentCrown} Couronnes initiales: {treasurySheet.beginCrown}
          <div className='regularTransactions'>
            <EarningsTable earnings={treasurySheet.earnings}></EarningsTable>
            <LossesTable losses={treasurySheet.losses}></LossesTable>
          </div>
          {/* {treasurySheet.earnings.taxes.map((earning) => {
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
          })} */}
        </div>
        : null}
    </div>
  );
}

export default Treasury;