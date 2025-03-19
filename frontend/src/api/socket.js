import { io } from 'socket.io-client';
import { WS_URL } from '../../config.js';

const token = localStorage.getItem('token');
const socket = io(WS_URL, {
  auth: { token },
  transports: ['websocket'],
});

export default socket;