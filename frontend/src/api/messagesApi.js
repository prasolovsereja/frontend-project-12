import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from '../../config.js';

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/messages`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({ query: () => "" }),
    newMessage: builder.mutation({
      query: (message) => ({
        method: "POST",
        body: message,
      }),
    }),
  }),
});

const { useGetMessagesQuery, useNewMessageMutation } = messagesApi;
export {
  useGetMessagesQuery as getMessages,
  useNewMessageMutation,
};
