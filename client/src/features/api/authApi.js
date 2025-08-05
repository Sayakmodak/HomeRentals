import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn, userLoggedOut } from '../authSlice';

const base_url = "http://localhost:8080/api/v1/user/"; 

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    credentials: "include"
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "signup",        //  http://localhost:8080/api/v1/user/signup
        method: 'POST',
        body: formData,
      })
    }),

    loginUser: builder.mutation({
      query: (formData) => ({
        url: "login",        //  http://localhost:8080/api/v1/user/login
        method: 'POST',
        body: formData,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
        const result = await queryFulfilled;
        const user = result.data.user;
        dispatch(userLoggedIn({user: user})); 
        } catch (error) {
          console.log(error);
        }
      }
    }),

    logoutUser: builder.query({
      query: () => ({
        url: "logout",        //  http://localhost:8080/api/v1/user/logout
        method: 'GET',
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      }
    }),
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserQuery} = authApi;