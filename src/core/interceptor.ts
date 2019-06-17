import axios from 'axios';

import { sharedSerivce } from '../_services/sharedService';
export const Interceptor = {
  requestInterceptor,
  responseInterceptor,
};

function requestInterceptor() {
  axios.interceptors.request.use((config) => {
    sharedSerivce.showHideLoader(true);
    return config;
  }, (error) => {
    sharedSerivce.showHideLoader(false);
    return Promise.reject(error);
  });
}

function responseInterceptor() {
  axios.interceptors.response.use((response) => {
    sharedSerivce.showHideLoader(false);
    return response;
  }, (error) => {
    sharedSerivce.showHideLoader(false);
    return Promise.reject(error);
  });
}
