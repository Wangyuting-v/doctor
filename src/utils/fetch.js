'use strict';

import axios from 'axios';
// axios.defaults.withCredentials = true;
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL:'http://aftercare.ifootoo.cn:8000/wechat',
  timeout: 12000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  const token = localStorage.token ? localStorage.token : null;
  // config.headers['Access-Control-Allow-Origin']=true;
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, error => {
  // Do something with request error
  // console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
        return response;
    },
    error => {
        let originalRequest = error.response;
        if (originalRequest && originalRequest.status === 401){
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
        console.log('err' + error);
        return Promise.reject(error);
    }
);

export default service;
