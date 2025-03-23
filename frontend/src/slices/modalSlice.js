/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  channel: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.channel = action.payload.channel || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.channel = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
