import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setIsAuthenticated,
  setUser,
  setLoading,
} from "../feautures/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  //base url fetchbaseurl
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/users",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",

      //transform the result
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          //extract data from the query after it was fulfilled
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (err) {
          dispatch(setLoading(false));
          console.log(err);
        }
      },
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: "/me/update_avatar",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/password/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: "/password/forgot",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
