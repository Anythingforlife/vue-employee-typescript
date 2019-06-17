import axios from 'axios';
import store from '../store';
import { STORE_TYPE } from '../_helpers/';

export const Interceptor = {
  requestInterceptor,
  responseInterceptor,
};

function requestInterceptor() {
  axios.interceptors.request.use((config) => {
    store.dispatch(STORE_TYPE.COMMAN_SHOW_HIDE_LOADER, true);
    return config;
  }, (error) => {
    store.dispatch(STORE_TYPE.COMMAN_SHOW_HIDE_LOADER, false);
    return Promise.reject(error);
  });
}

function responseInterceptor() {
  axios.interceptors.response.use((response) => {
    store.dispatch(STORE_TYPE.COMMAN_SHOW_HIDE_LOADER, false);
    return response;
  }, (error) => {
    store.dispatch(STORE_TYPE.COMMAN_SHOW_HIDE_LOADER, false);
    return Promise.reject(error);
  });
}
