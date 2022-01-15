import axios, {AxiosRequestConfig} from 'axios';
import * as AxiosLogger from 'axios-logger';

const SERVER_URI = 'http://192.249.18.180';
const TEST_SERVER_URI = 'http://localhost:3000';

export const apiInstance = axios.create({
  baseURL: TEST_SERVER_URI,
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
