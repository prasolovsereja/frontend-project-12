import { createSlice } from '@reduxjs/toolkit';

const getToken = () => localStorage.getItem('token');

const initialState = {
  token: getToken() || null,
  isAuthenticated: !!getToken(),
  username: null, 
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