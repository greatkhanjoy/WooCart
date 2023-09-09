import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => `/wp-json/wc/store/cart`,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: `/wp-json/wc/store/cart/add-item`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ quantity, itemKey }) => ({
        url: `/wp-json/wc/store/cart/items/${itemKey}`,
        method: "PUT",
        body: { quantity, item_key: itemKey },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteItem: builder.mutation({
      query: (itemKey) => ({
        url: `/wp-json/wc/store/cart/items/${itemKey}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/wp-json/wc/store/cart/items`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    applyCoupon: builder.mutation({
      query: (coupon) => ({
        url: `/wp-json/wc/store/cart/apply-coupon`,
        method: "POST",
        body: { code: coupon },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCoupon: builder.mutation({
      query: (code) => ({
        url: `/wp-json/wc/store/cart/coupons/${code}`,
        method: "DELETE",
        body: { code },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useClearCartMutation,
  useDeleteItemMutation,
  useApplyCouponMutation,
  useRemoveCouponMutation,
} = cartApi;
