import { axiosInstance } from './api';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { PlayerData } from '../models/playerData.model';
import { useDispatch } from 'react-redux';
import { setFirstname, setLastname, setMJ } from '../redux/reducers/player.reducer';
import { setYear, setMonth, setCurrentCrown } from '../redux/reducers/data.reducer';

function checkConnection(): boolean {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  axiosInstance.get('login/verify', {
    withCredentials: true
  })
    .then(response => {
      // console.log(response.data);
    })
    .catch(error => {
      console.log(error);
      navigate('/', { replace: true });
    });


  if (localStorage.getItem('token')) {
    // const decodedToken: PlayerData = jwt_decode(token);
    // console.log(decodedToken);
    const decodedToken: { player: PlayerData, data: any } = jwt_decode(localStorage.getItem('token') as string);
    // console.log(decodedToken);
      
    dispatch(setFirstname(decodedToken.player.firstname));
    dispatch(setLastname(decodedToken.player.lastname));
    dispatch(setMJ(decodedToken.player.mj));

    dispatch(setYear(decodedToken.data.year));
    dispatch(setMonth(decodedToken.data.month));
    dispatch(setCurrentCrown(decodedToken.data.currentCrown));
    
    return(true);
  } else {
    return(false);
  }
}

export { checkConnection };