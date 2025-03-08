import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { selectedChannel: null},
  reducers: {
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
  },
});

export const { setSelectedChannel } = channelsSlice.actions;
export default channelsSlice.reducer;