import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shopit-e-commerce-1.onrender.com/api/v1",
  }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/new",
          method: "POST",
          body,
        };
      },
    }),
    stripeCheckOutSession: builder.mutation({
      query(body) {
        return {
          url: "/checkout_session",
          method: "POST",
          body,
        };
      },
    }),

    getMyorders: builder.query({
      query: () => `/me/order`,
    }),

    getorderDetails: builder.query({
      query: (id) => `/order/${id}`,
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckOutSessionMutation,
  useGetMyordersQuery,
  useGetorderDetailsQuery,
} = orderApi;
