import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser,setLoading } from '../feautures/userSlice'


export const userApi = createApi({
      reducerPath:'userApi',
      //base url fetchbaseurl
      baseQuery: fetchBaseQuery({
        baseUrl:"/api/v1/users"
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
    dispatch(setLoading(false))
            }catch(err){
              dispatch(setLoading(false))
              console.log(err)
            }
          }
        }),

      updateProfile: builder.mutation({
        query(body) {
          return{
            url:"/me/update",
            method:"PUT",
            body,
          }
        }
      }),
      uploadAvatar: builder.mutation({
        query(body) {
          return{
            url:"/me/update_avatar",
            method:"PUT",
            body,
          }
        }
      })
      }),
    })

export const {useGetMeQuery,useUpdateProfileMutation,useUploadAvatarMutation} = userApi