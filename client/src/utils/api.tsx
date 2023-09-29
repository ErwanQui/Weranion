import axios from 'axios';
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
  axiosInstance.get('login/verify').then((id) => {
    initPing(id.data);
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