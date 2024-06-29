import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
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
     query: () => `/me/order`
    }),
    
    orderDetails: builder.query({
      query: (id) => `/order/${id}`
   
     }),
  }),
});

export const { useCreateNewOrderMutation, useStripeCheckOutSessionMutation,useGetMyordersQuery,useOrderDetailsQuery } =
  orderApi;
