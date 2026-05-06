import { useNavigate } from 'react-router-dom'; // Add this
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/api';
// import { checkConnection } from '../../utils/authentification';
import { Button, Fab } from '@mui/material';
import { AttachMoney, HomeOutlined, LocationCity, Map, MenuBookOutlined, Person } from '@mui/icons-material';
import { TreasurySheet } from '../../models/treasury.model';
import { useDispatch, useSelector } from 'react-redux';
import Ably from 'ably';

import './Treasury.scss';
import EarningsTable from './EarningsTable/EarningsTable';
import LossesTable from './LossesTable/LossesTable';
import SheetsList from './SheetsList/SheetsList';
import { setMonth, setYear } from '../../redux/reducers/data.reducer';
import MenuBar from '../../components/MenuBar/MenuBar';
// import { Button, TextField } from '@mui/material';

function Treasury() {
  // checkConnection();

  // const year = 1;
  // const month = 4;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [treasurySheet, updateTreasurySheet] = useState<TreasurySheet>();
  // const [password, updatePassword] = useState('');
  // const [failed, updateFailed] = useState(false);
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);


  // const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updatePassword(event.target.value);
  // };
  const { year, month, currentCrown } = useSelector((state: any) => state.data);
  const [usedDate, updateUsedDate] = useState<{ year: number, month: number}>({ year: year, month: month});
  // const [usedMonth, updateUsedMonth] = useState<number>(month);

  useEffect(() => {
    updateUsedDate({ year: year, month: month});
  }, [year, month]);

  useEffect(() => {
    axiosInstance.get('treasury/', {
      params: { year: usedDate.year, month: usedDate.month },
      withCredentials: true
    })
      .then(response => {
        console.log('treasurySheet', response.data);
        updateTreasurySheet(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [usedDate]);

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
        params: { year: usedDate.year, month: usedDate.month },
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

  function createNewSheet() {
    axiosInstance.post('treasury/createNextSheet', {
      year: year,
      month: month
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        // pb ici pour le moment
        dispatch(setYear(response.data.year));
        dispatch(setMonth(response.data.month));
        //
        updateTreasurySheet(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='treasury'>
      {/* <div className='menuBar'>
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
      </div> */}
      <MenuBar></MenuBar>
      <div>
        <Button onClick={() => createNewSheet()}>New Sheet</Button>
      </div>
      <div className='sheetsInterface'>
        <div className='sheetsList'>
          <SheetsList updateSheetDate={updateUsedDate}></SheetsList>
        </div>
        <div className='sheetDetails'>
          {treasurySheet ?
            <div>
            Feuille de compte du {usedDate.month}/{usedDate.year}
            Couronnes actuelles: {currentCrown} Couronnes initiales: {treasurySheet.beginCrown}
              <div className='regularTransactions'>
                <EarningsTable earnings={treasurySheet.earnings}></EarningsTable>
                <LossesTable losses={treasurySheet.losses}></LossesTable>
              </div>
            </div>
            : null}
        </div>
      </div>
    </div>
  );
}

export default Treasury;