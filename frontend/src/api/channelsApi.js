import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config.js';
import routes from './routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}${routes.channels}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
     }),
    newChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

const {
  useGetChannelsQuery,
  useNewChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
export {
  useGetChannelsQuery,
  useNewChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
};
