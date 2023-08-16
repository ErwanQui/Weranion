import { useNavigate } from 'react-router-dom'; // Add this
import React, { useState } from 'react';
import axios from '../../api';
import checkConnection from '../../utils/authentification';

// import './Login.scss';
// import { Button, TextField } from '@mui/material';

function Main() {

  checkConnection();

  // const navigate = useNavigate();
  // const [username, updateUsername] = useState('');
  // const [password, updatePassword] = useState('');
  // const [failed, updateFailed] = useState(false);

  // const setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updateUsername(event.target.value);
  // };

  // const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updatePassword(event.target.value);
  // };

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

  return (<div>
    Main
  </div>
  );
}

export default Main;