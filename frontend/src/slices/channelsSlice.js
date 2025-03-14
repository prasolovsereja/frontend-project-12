import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { selectedChannel: null, channels: [], },
  reducers: {
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    removeChannel: (state, action) => {
      const channelId = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== channelId);
    },
    renameChannel: (state, action) => {
      const index = state.channels.findIndex((ch) => ch.id === action.payload.id);
      if (index !== -1) {
        state.channels[index] = action.payload;
      }
    },
  },
});

export const { setSelectedChannel, addChannel, setChannels, removeChannel, renameChannel } = channelsSlice.actions;
export default channelsSlice.reducer;