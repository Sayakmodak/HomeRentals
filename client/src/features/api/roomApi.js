import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "http://localhost:8080/api/v1/hotel/";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addRoom: builder.mutation({
      query: ({ hotelId, formData }) => ({
        url: `${hotelId}/room/addroom`, //  http://localhost:8080/api/v1/hotel/{hotelId}/room/addroom
        method: "POST",
        body: formData,
      }),
    }),
    fetchSpecificRoom: builder.query({
      query: (roomId) => ({
        url: `room/${roomId}`, //  http://localhost:8080/api/v1/hotel/room/{roomId}
        method: "GET",
      }),
    }),
  }),
});

export const { useAddRoomMutation, useFetchSpecificRoomQuery } = roomApi;

// http://localhost:8080/api/v1/hotel/68b5a8d408f558795280138f/room/addroom
