import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://staging-api-public.streamflow.finance/v2/api',
});
