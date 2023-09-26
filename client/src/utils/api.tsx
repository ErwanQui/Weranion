import axios from 'axios';

const token = localStorage.getItem('token');

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

export { axiosInstance, updateInstance };