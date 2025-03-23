import { logout, login } from './authSlice.js';
import socketService from '../utils/socketService.js';

export const logoutAndCleanup = () => (dispatch) => {
  socketService.disconnectSocket();
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  dispatch(logout());
};
export const loginAndSetup = (data) => (dispatch) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('username', data.username);
  socketService.createEmptySocket();
  socketService.connectWithToken(data.token);
  socketService.createSubscribe();
  dispatch(login(data));
};
