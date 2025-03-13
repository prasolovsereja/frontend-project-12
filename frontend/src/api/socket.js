import { io } from 'socket.io-client';

const token = localStorage.getItem('token');
const socket = io('http://localhost:5001', {
  auth: { token },
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("✅ WebSocket подключен:", socket.id);
});
socket.onAny((event, data) => {
  console.log(`📡 Получено событие: ${event}`, data);
});

export default socket;