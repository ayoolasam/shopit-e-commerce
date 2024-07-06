import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/products",
  }),
  tagTypes:["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
      providesTags:["Product"]
    }),

    Createreview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
      invalidatesTags:["Product"]
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery ,useCreatereviewMutation} = productApi;
