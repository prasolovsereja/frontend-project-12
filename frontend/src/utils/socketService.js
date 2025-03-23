import { io } from 'socket.io-client';
import { WS_URL } from '../../config.js';
import { channelsApi } from '../api/channelsApi.js';
import { messagesApi } from '../api/messagesApi.js';
import { setSelectedChannelId } from '../slices/channelsSlice.js';

let socket = null;
let store = null;

const createEmptySocket = () => {
  if (!socket) {
    socket = io(WS_URL, {
      autoConnect: 'false',
      transports: ['websocket'],
    });
  }
  return socket;
};

const setStore = (externalStore) => {
  store = externalStore;
};

const connectWithToken = (token) => {
  if (!socket) return;
  socket.auth = { token };
  socket.connect();
};

const createSubscribe = () => {
  if (!socket || !store) return;

  const { dispatch } = store;

  socket.on('newMessage', () => {
    dispatch(messagesApi.util.invalidateTags(['Messages']));
  });

  socket.on('newChannel', () => {
    dispatch(channelsApi.util.invalidateTags(['Channels']));
  });

  socket.on('removeChannel', ({ id }) => {
    const { selectedChannelId } = store.getState().channels;
    if (selectedChannelId === id) {
      dispatch(setSelectedChannelId(0));
    }
    dispatch(messagesApi.util.invalidateTags(['Messages']));
    dispatch(channelsApi.util.invalidateTags(['Channels']));
  });

  socket.on('renameChannel', () => {
    dispatch(channelsApi.util.invalidateTags(['Channels']));
  });
};

const disconnectSocket = () => {
  if (socket) {
    socket.off();
    socket.disconnect();
    socket = null;
  }
};

export default {
  createEmptySocket,
  connectWithToken,
  createSubscribe,
  disconnectSocket,
  setStore,
};
