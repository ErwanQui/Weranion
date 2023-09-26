import { axiosInstance } from './api';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { PlayerData } from '../models/playerData.model';
import { useDispatch } from 'react-redux';
import { setFirstname, setLastname, setMJ } from '../redux/reducers/player.reducer';

function checkConnection(): boolean {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  axiosInstance.get('login/verify', {
    withCredentials: true
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
      navigate('/', { replace: true });
    });

  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  if (token) {
    const decodedToken: PlayerData = jwt_decode(token);
    console.log(decodedToken);
    
    dispatch(setFirstname(decodedToken.firstname));
    dispatch(setLastname(decodedToken.lastname));
    dispatch(setMJ(decodedToken.mj));
    return(true);
  } else {
    return(false);
  }
}

export { checkConnection };