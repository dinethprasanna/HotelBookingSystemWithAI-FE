//here we have the rtk queries
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/`,
        prepareHeaders: async (headers, { getState }) => {
            const token = await window?.Clerk?.session?.getToken();
            // console.log(token);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
    }),
    endpoints: (builder) => ({
        getHotels: builder.query({
            query: () => "hotels",
        }),
        getHotelById: builder.query({
            query: (id) => `hotels/${id}`,
        }),
        getHotelsForSearchQuery: builder.query({
            query: ({ query }) => `hotels/search/retrieve?query=${query}`,
        }),
        createHotel: builder.mutation({
            query: (hotel) => ({
                url: "hotels",
                method: "POST",
                body: hotel,
            }),
        }),
        deleteHotelById: builder.mutation({
            query: (id) => ({
                url: `hotels/${id}`,
                method: "DELETE",
            }),
        }),
        updateHotelById: builder.mutation({
            query: ({ id, hotel }) => ({
                url: `hotels/${id}`,
                method: "PUT",
                body: hotel,
            }),
        }),
        createBooking: builder.mutation({
            query: (booking) => ({
                url: "bookings",
                method: "POST",
                body: booking,
            }),
        }),
        getBookingById: builder.query({
            query: (id) => `bookings/${id}`,
        }),
        getUserBookings: builder.query({
            query: (id) => `bookings/getUserBookings/${id}`,
        }),
        createCheckoutSession: builder.mutation({
            query: () => ({
                url: `payments/create-checkout-session`,
                method: "POST",
            }),
        }),
        getCheckoutSessionStatus: builder.query({
            query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
        }),
        getAllBookings: builder.query({
            query: () => `bookings`,
            providesTags: ["Booking"],
        }),
        deleteBookingById: builder.mutation({
            query: (id) => ({
                url: `bookings/${id}`,
                method: "DELETE",
            }),
            providesTags: ["Booking"],
        }),
    })
});

export const { useGetHotelsQuery, useGetHotelByIdQuery, useCreateHotelMutation, useDeleteHotelByIdMutation, useUpdateHotelByIdMutation,
    useCreateBookingMutation, useGetUserBookingsQuery,
    useGetHotelsForSearchQueryQuery, useGetBookingByIdQuery, useCreateCheckoutSessionMutation,
    useGetCheckoutSessionStatusQuery, useGetAllBookingsQuery, useDeleteBookingByIdMutation
} = api;