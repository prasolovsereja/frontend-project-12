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
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;