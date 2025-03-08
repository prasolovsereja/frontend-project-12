import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
  }),
});

const { useGetChannelsQuery } = channelsApi;
export {
  useGetChannelsQuery as getChannels,
};