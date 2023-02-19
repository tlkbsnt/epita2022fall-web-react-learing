import axios, { AxiosInstance } from 'axios';

const baseURL = '';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  timeoutErrorMessage: 'Time out!',
});

// axiosInstance.interceptors.response.use(function(res){
//   if(res.status === 401)
// });

export default axiosInstance;
