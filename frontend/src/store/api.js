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
  }),
});

export const { useNamePostMutation } = pokemonApi;
