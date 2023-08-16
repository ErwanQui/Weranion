import axios from '../api';
import { useNavigate } from 'react-router-dom';

async function checkConnection() {
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
}

export default checkConnection;