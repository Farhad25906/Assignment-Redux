import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookmangementbackend.vercel.app/api",
  }),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["books"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    borrowNewBook: builder.mutation({
      query: (borrowBookData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowBookData,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    getAllBorrowBooks: builder.query({
      query: () => "/borrow",
       providesTags: ["borrow"]
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBookByIdQuery,
  useBorrowNewBookMutation,
  useGetAllBorrowBooksQuery,
} = baseApi;
