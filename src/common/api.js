import axios from 'axios';

const LAST_FM_API_KEY = '81801e3578932e0df2e3dc3aeb16a6e5';


export const ubeatApi = axios.create({
  baseURL: 'https://ubeat.herokuapp.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const lastFmApi = axios.create({
  baseURL: 'http://ws.audioscrobbler.com/2.0/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  params: {
    api_key: LAST_FM_API_KEY,
    format: 'json'
  }
});

