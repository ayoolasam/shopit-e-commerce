import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser } from '../feautures/userSlice'


export const userApi = createApi({
      reducerPath:'userApi',
      //base url fetchbaseurl
      baseQuery: fetchBaseQuery({
        baseUrl:"api/v1/users"
      }),
      //endpoints
      endpoints:(builder) => ({
        getMe : builder.query({
          query:() => '/me',
          //transform the result
          transformResponse:(result) => result.user,
          async onQueryStarted(args,{dispatch,queryFulfilled}) {
            try{
              //extract data from the query after it was fulfilled
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