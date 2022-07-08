import _axios from 'axios';

const axios = baseUrl =>{
  const instance = _axios.create({
    baseURL: baseUrl || process.env.REACT_APP_API_DOMAIN || 'http://localhost:3003',
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'}
  });

  //可以攔截請求或是回應，參考：https://github.com/axios/axios
  instance.interceptors.request.use(
    config => {
      const jwToken = global.auth.getToken();
      config.headers['Authorization'] = `Bearer ${jwToken}`;
      // Do something before request is sent
      return config;
    }, 
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return instance;
}

export { axios } //為了要可以傳遞參數baseUrl要export

export default axios();