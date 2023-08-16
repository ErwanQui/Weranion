import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PATH
});

console.log(process.env.REACT_APP_SERVER_PATH);

export default instance;