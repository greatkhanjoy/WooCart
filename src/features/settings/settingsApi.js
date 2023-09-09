import { apiSlice } from "../api/apiSlice";

export const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/wp-json/browter-woo-cart/v1/settings",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/wp-json/browter-woo-cart/v1/settings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
