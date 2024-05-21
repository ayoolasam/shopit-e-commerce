import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const productApi = createApi({
  reducerPath:'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl:"api/v1/products"
  }),
  endpoints:(builder) => ({
    getProducts : builder.query({
      query:(params) => '/products'
    }),
    getProductDetails: builder.query({
      query: (id) => `/${id}`
    
    }),
  })
})

export const {useGetProductsQuery,useGetProductDetailsQuery} = productApi