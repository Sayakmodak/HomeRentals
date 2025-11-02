import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "http://localhost:8080/api/v1/hotel/";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    bookRoom: builder.mutation({
      query: ({ hotelId, roomId, ...formData }) => ({
        url: `room/booking/hotel/${hotelId}/room/${roomId}/reserve`, //  http://localhost:8080/api/v1/hotel/room/booking/hotel/hotelId/room/roomId/reserve
        method: "POST",
        body: formData,
      }),
    }),

    isAvailableRoom: builder.mutation({
      query: ({ hotelId, roomId, ...formData }) => ({
        url: `room/booking/hotel/${hotelId}/room/${roomId}/isavailable`, //  http://localhost:8080/api/v1/hotel/room/booking/hotel/hotelId/room/roomId/isavailable
        method: "POST",
        body: formData,
      }),
    }),

    showMyBoookings: builder.query({
      query: (userId) => ({
        url: `${userId}/mybookings`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBookRoomMutation,
  useIsAvailableRoomMutation,
  useShowMyBoookingsQuery,
} = bookingApi;
