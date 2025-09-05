import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const base_url = "http://localhost:8080/api/v1/room/";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addRoom: builder.mutation({
      query: (addRoom) => ({
        url: "addroom", //  http://localhost:8080/api/v1/room/addroom
        method: "POST",
        body: addRoom,
      }),
    }),
  }),
});

export const { useAddRoomMutation } = roomApi;
