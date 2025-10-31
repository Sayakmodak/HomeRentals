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

    listHotels: builder.query({
      query: () => ({
        url: "list-hotels", //  http://localhost:8080/api/v1/hotel/list-hotels
        method: "GET",
      }),
    }),

    getHotelById: builder.query({
      query: (hotelId) => ({
        url: `hotel/${hotelId}`, //  http://localhost:8080/api/v1/hotel/hotel/:hotelId
        method: "GET",
      }),
    }),

    updateHotel: builder.mutation({
      query: ({ hotelId, formData }) => ({
        url: `update-hotel/${hotelId}`, //  http://localhost:8080/api/v1/hotel/update-hotel/:hotelId
        method: "PUT",
        body: formData,
      }),
    }),

    setAsFeatured: builder.mutation({
      query: (hotelId) => ({
        url: `/hotel/${hotelId}/setasfeature`, //  http://localhost:8080/api/v1/hotel/hotel/:hotelId/setasfeature
        method: "POST",
      }),
    }),

    setAsUnFeatured: builder.mutation({
      query: (hotelId) => ({
        url: `/hotel/${hotelId}/setasunfeature`, //  http://localhost:8080/api/v1/hotel/hotel/:hotelId/setasunfeature
        method: "POST",
      }),
    }),

    fetchFeaturedHotels: builder.query({
      query: () => ({
        url: `/hotel/featuredhotels`, //  http://localhost:8080/api/v1/hotel/hotel/featuredhotels
        method: "GET",
      }),
    }),

    searchHotels: builder.query({
      // array
      query: (categories) => {
        let url = `/search-by-category`;

        if (categories && categories.length > 0) {
          const query = categories.map(encodeURIComponent).join(","); // string-> "Luxury Hotels, Botique Hotels"
          url += `?categories=${query}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddHotelMutation,
  useListHotelsQuery,
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
  useSetAsFeaturedMutation,
  useSetAsUnFeaturedMutation,
  useFetchFeaturedHotelsQuery,
  useSearchHotelsQuery,
} = hotelApi;
