import axios from 'axios';

export const coinGeckoClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});
