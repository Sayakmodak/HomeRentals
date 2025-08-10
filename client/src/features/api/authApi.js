import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const base_url = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (signupData) => ({
        url: "signup", //  http://localhost:8080/api/v1/user/signup
        method: "POST",
        body: signupData,
      }),
    }),

    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "login", //  http://localhost:8080/api/v1/user/login
        method: "POST",
        body: loginData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const user = result.data.user;
          dispatch(userLoggedIn({ user: user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logoutUser: builder.query({
      query: () => ({
        url: "logout", //  http://localhost:8080/api/v1/user/logout
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: "/profile", //  http://localhost:8080/api/v1/user/profile
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const user = result.data.user;
          dispatch(userLoggedIn({ user: user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateUserProfile: builder.mutation({
      query: (formData) => ({ 
        url: "/update-profile", //  http://localhost:8080/api/v1/user/update-profile
        method: "POST",
        body: formData,
      }),
    }),
  }),
});


export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = authApi;
