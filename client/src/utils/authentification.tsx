import axios from '../api';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { PlayerData } from '../models/playerData.model';

function checkConnection(): PlayerData | null {
  const navigate = useNavigate();

  axios.get('login/verify', {
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
    const player: PlayerData = {
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname,
      mj: decodedToken.mj,
    };
    return(player);
  } else {
    return(null);
  }
}

export default checkConnection;