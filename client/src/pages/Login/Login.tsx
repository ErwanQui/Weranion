import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { axiosInstance, updateInstance } from '../../utils/api';
import jwt_decode from 'jwt-decode';

import './Login.scss';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFirstname, setLastname, setMJ, connectPlayer } from '../../redux/reducers/player.reducer';
import { PlayerData } from '../../models/playerData.model';

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [failed, updateFailed] = useState(false);

  function setUsername(event: React.ChangeEvent<HTMLInputElement>) {
    updateUsername(event.target.value);
  }

  function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
    updatePassword(event.target.value);
  }

  function setPlayerData(token: any) {
    console.log('fdsffds');
    localStorage.setItem('token', token);
    updateInstance(token);
    const decodedToken: PlayerData = jwt_decode(token);
    console.log(decodedToken);
      
    dispatch(setFirstname(decodedToken.firstname));
    dispatch(setLastname(decodedToken.lastname));
    dispatch(setMJ(decodedToken.mj));
    dispatch(connectPlayer());
  }

  async function connect() {
    axiosInstance.post('login/connect', {
      username: username,
      password: password
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        if (response.data) {
          setPlayerData(response.data.token);
          navigate('/main', { replace: true });
        } else {
          updateFailed(true); 
        }
      })
      .catch(error => {
        console.log(error);
        updateFailed(true); 
      });
  }

  return (
    <div className='login'>
      <div>
        <h1>
          Weranion
        </h1>
        <h3>
          Page de connexion
        </h3>
        <div className="connectionFields">
          <div className="inputContainer">
            <TextField
              label="Pseudo"
              className='textField'
              variant="outlined"
              value={username}
              onChange={setUsername}
              color="sandyBrown"
              sx={{ bgcolor: 'sandyBrown.light' }}
            />
            <TextField
              label="Mot de passe"
              className='textField'
              variant="outlined"
              value={password}
              onChange={setPassword}
              color="sandyBrown"
              sx={{ bgcolor: 'sandyBrown.light' }}
            />
          </div>

          <Button className='connectButton' variant="contained" color="sandyBrown" sx={{ bgcolor: 'sandyBrown.light'}} onClick={connect}>
            Connexion
          </Button>
          <div className='errorText'>
            { failed ? 'Erreur d\'authentification' : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
