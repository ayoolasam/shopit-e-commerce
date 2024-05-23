import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser } from '../feautures/userSlice'


export const userApi = createApi({
  reducerPath:'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl:"api/v1/users"
  }),
  endpoints:(builder) => ({
    getMe : builder.query({
      query:() => '/me',
      transformResponse:(result) => result.user,
      async onQueryStarted(args,{dispatch,queryFulfilled}) {
        try{
 const {data} = await queryFulfilled
 dispatch(setUser(data))
 dispatch(setIsAuthenticated(true))
        }catch(err){
          console.log(err)
        }
      }
    }),
  
  }),
})

export const {useGetMeQuery} = userApi