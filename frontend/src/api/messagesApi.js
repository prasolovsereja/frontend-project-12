import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config.js';
import routes from './routes.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}${routes.messages}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    newMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

const { useGetMessagesQuery, useNewMessageMutation } = messagesApi;
export {
  useGetMessagesQuery,
  useNewMessageMutation,
};
