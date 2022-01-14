import axios, {AxiosRequestConfig} from 'axios';
import * as AxiosLogger from 'axios-logger';

export const apiInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

apiInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {status} = error.response;
  },
);

if (true) {
  apiInstance.interceptors.response.use(AxiosLogger.responseLogger);
  apiInstance.interceptors.request.use(AxiosLogger.requestLogger);
}
