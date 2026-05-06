
import React, { useEffect, useState } from 'react';
import { HomeOutlined, AttachMoney, MenuBookOutlined, Map, LocationCity, Person } from '@mui/icons-material';
import { Button, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Ably from 'ably';
import jwt_decode from 'jwt-decode';

import './MenuBar.scss';
import { axiosInstance, updateInstance } from '../../utils/api';
import { setCurrentCrown, setMonth, setYear } from '../../redux/reducers/data.reducer';
import { PlayerData } from '../../models/playerData.model';

function MenuBar () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ablyClient, setAblyClient] = useState<Ably.Realtime | null>(null);

  const { year, month, currentCrown } = useSelector((state: any) => state.data);

  function nextMonth() {
    axiosInstance.post('main/nextDate', {
      year: year,
      month: month
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        dispatch(setYear(response.data.date.currentYear));
        dispatch(setMonth(response.data.date.currentMonth));
        localStorage.setItem('token', response.data.token);
        updateInstance(response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    axiosInstance.get('login/verifyToken', {
      withCredentials: true
    })
      .then(response => {
        console.warn('ouep');
        if(response.data.token !== '') {
          console.log('newToken', response.data.token);
          localStorage.setItem('token', response.data.token);
          updateInstance(response.data.token);
          const decodedToken: { player: PlayerData, data: any } = jwt_decode(response.data.token);
          
          dispatch(setYear(decodedToken.data.year));
          dispatch(setMonth(decodedToken.data.month));
          // dispatch(setCurrentCrown(decodedToken.data.currentCrown));
        }
      })
      .catch(error => {
        console.log(error);
      });

    const apiKey = process.env.REACT_APP_ABLY_API_KEY;
    const client = new Ably.Realtime({ key: apiKey });
    setAblyClient(client);

    const channel = client.channels.get('main');
    console.log('ok');

    channel.subscribe('newDate', () => {
      axiosInstance.get('main/currentDate', {
        params: { year: year, month: month },
        withCredentials: true
      })
        .then(response => {
          console.log('newToken', response.data.token);
          localStorage.setItem('token', response.data.token);
          updateInstance(response.data.token);

          dispatch(setYear(response.data.date.currentYear));
          dispatch(setMonth(response.data.date.currentMonth));
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

  return(
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
      Date actuelle: {month}/{year}      Couronnes actuelles: {currentCrown}
      <Button
        color="sandyBrown"
        onClick={() => nextMonth()}>
          Passer au mois suivant
      </Button>
      <div className='endMenus'>
        <Fab size="small" color="brown"
          onClick={() => navigate('/')}>
          <LocationCity/>
        </Fab>
        <Fab size="small" color="brown"
          onClick={() => navigate('/map')}>
          <Map/>
        </Fab>
        <Fab size="small" color="brown"
          onClick={() => navigate('/')}>
          <Person/>
        </Fab>
      </div>
    </div>
  );
}

export default MenuBar;