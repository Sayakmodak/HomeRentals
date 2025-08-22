import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "http://localhost:8080/api/v1/hotel/";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addHotel: builder.mutation({
      query: (registerHotel) => ({
        url: "addhotel", //  http://localhost:8080/api/v1/hotel/addHotel
        method: "POST",
        body: registerHotel,
      }),
    }),
  }),
});

export const { useAddHotelMutation } = hotelApi;
