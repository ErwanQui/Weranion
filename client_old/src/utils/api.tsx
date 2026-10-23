import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setYear, setMonth, setCurrentCrown } from '../redux/reducers/data.reducer';
import { PlayerData } from '../models/playerData.model';
import jwt_decode from 'jwt-decode';
const token = localStorage.getItem('token');
let pingTimer: ReturnType<typeof setInterval>;


function redirect(url: string, asLink = true) {
  asLink ? (window.location.href = url) : window.location.replace(url);
}

let axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PATH,
  headers: {
    common: {
      Authorization: `Bearer ${token}`,
    },
  },
});

function updateInstance(token: string) {
  axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_PATH,
    headers: {
      common: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

if (window.location.href !== process.env.REACT_APP_CLIENT_PATH) {
  axiosInstance.get('login/verify').then((response) => {
    initPing(response.data.id);
    // //Change this in MenuBar
    // if(response.data.token !== '') {
    //   console.log(response.data.token);
    //   localStorage.setItem('token', response.data.token);
    //   updateInstance(response.data.token);
    //   // const decodedToken: { player: PlayerData, data: any } = jwt_decode(response.data.token);
      
    //   // const dispatch = useDispatch();
    //   // dispatch(setYear(decodedToken.data.year));
    //   // dispatch(setMonth(decodedToken.data.month));
    //   // dispatch(setCurrentCrown(decodedToken.data.currentCrown));
    // }
  }, () => {
    console.warn('unvalid Token');
    redirect(process.env.REACT_APP_CLIENT_PATH as string);
  });
}

function initPing(id: string) {
  clearInterval(pingTimer);
  sendPing(id);
  pingTimer = setInterval(() => { sendPing(id); }, 150000);
}

function sendPing(id: string) {
  axiosInstance.get('login/ping', { params: { id: id } }).then(() => {
    console.log('valid ping');
  }).catch(error => {
    console.warn('unvalid ping', error);
    if (window.location.href !== process.env.REACT_APP_CLIENT_PATH) {
      redirect(process.env.REACT_APP_CLIENT_PATH as string);
    }
  });
}

export { axiosInstance, updateInstance, initPing };