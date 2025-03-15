import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from '../../config.js';

export const channelsApi = createApi({
  reducerPath: "channelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/channels`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({ query: () => "" }),
    newChannel: builder.mutation({
      query: (channel) => ({
        method: "POST",
        body: channel,
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { name },
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
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
  useGetChannelsQuery as getChannels,
  useNewChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
};
