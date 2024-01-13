import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  endpoints: (builder) => ({
    namePost: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/names",
        body,
      }),
    }),
    createPost: builder.mutation({
      query: (body) => ({
        method: "post",
        url: "/posts",
        body,
      }),
      invalidatesTags: ["post"],
    }),
    getPosts: builder.query({
      query: () => ({
        method: "get",
        url: "/posts",
      }),
      providesTags: ["post"],
    }),
    createComment: builder.mutation({
      query: ({ body, id }) => ({
        method: "POST",
        url: `/posts/${id}/comments`,
        body,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useNamePostMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useCreateCommentMutation,
} = pokemonApi;
