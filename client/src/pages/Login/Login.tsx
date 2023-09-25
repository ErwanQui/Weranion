import { useNavigate } from 'react-router-dom'; // Add this
import React, { useState } from 'react';
import axios from '../../api';
import { useCookies } from 'react-cookie';

import './Login.scss';
import { Button, TextField } from '@mui/material';

function Login() {

  // const [removeCookie] = useCookies(['token']);
  // removeCookie('token');

  const navigate = useNavigate();
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [failed, updateFailed] = useState(false);

  function setUsername(event: React.ChangeEvent<HTMLInputElement>) {
    updateUsername(event.target.value);
  }

  function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
    updatePassword(event.target.value);
  }

  async function connect() {
    axios.post('login/connect', {
      username: username,
      password: password
    }, {
      withCredentials: true
    })
      .then(response => {
        console.log(response.data);
        if (response.data) {
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