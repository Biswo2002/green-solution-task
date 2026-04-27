import axios from 'axios';
import HOSTS from './hosts';

const APIClient = axios.create({
  baseURL: HOSTS.MAIN,
  headers: {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'},
});
const AuthAPIClient = axios.create({
  baseURL: HOSTS.MAIN,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
  },
});

export {AuthAPIClient};
export default APIClient;
