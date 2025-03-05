import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import { apiSlice } from '../api/apiSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});