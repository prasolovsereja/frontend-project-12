import { createSlice } from '@reduxjs/toolkit';

const getToken = () => localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!getToken(), 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;