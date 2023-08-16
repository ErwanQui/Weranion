import axios from 'axios';
import config from './config';

const instance = axios.create({
  baseURL: (config.dbProd ? process.env.REACT_APP_SERVER_PATH : process.env.REACT_APP_SERVER_TEST_PATH)
});

export default instance;