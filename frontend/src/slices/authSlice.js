/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const getToken = () => localStorage.getItem('token');
const getUsername = () => localStorage.getItem('username');

const initialState = {
  token: getToken() || null,
  isAuthenticated: !!getToken(),
  username: getUsername() || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
