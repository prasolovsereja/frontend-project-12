/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { selectedChannelId: '1' },
  reducers: {
    setSelectedChannelId: (state, action) => {
      state.selectedChannelId = action.payload;
    },
  },
});

export const { setSelectedChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
