import { httpService } from '../core';
import { storageService } from './storageService';

export const authenticationService = {
  login,
  register,
  logout,
};

function login(credentials: any) {
  return httpService.postMethod('users/authenticate', credentials);
}

function register(user: any) {
  return httpService.postMethod('users/register', user);
}

function logout() {
  storageService.removeData('user');
}
