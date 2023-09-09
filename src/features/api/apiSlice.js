import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      headers.set("X-WP-Nonce", getState().auth.nonce);
      headers.set("X-WC-Store-API-Nonce", getState().auth.wc_nonce);
    },
  }),
  tagTypes: ["Cart", "Settings"],
  endpoints: (builder) => ({}),
});
