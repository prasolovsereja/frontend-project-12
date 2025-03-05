import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({ query: () => '/channels'}),
    getMessages: builder.query({ query: () => '/messages'}),
  }),
});

const { useGetChannelsQuery, useGetMessagesQuery } = apiSlice;
export {
  useGetChannelsQuery as getChannels,
  useGetMessagesQuery as getMessages
};