import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://weranion-server.vercel.app'
});

export default instance;