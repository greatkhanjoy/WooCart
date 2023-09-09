import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVariableProduct: builder.query({
      query: (id) => `/wp-json/browter-woo-cart/v1/products/${id}/variations`,
    }),
    getVariableProductTemp: builder.query({
      query: (link) => link,
    }),
  }),
});

export const { useGetVariableProductQuery, useGetVariableProductTempQuery } =
  productApi;
