import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;

  liked?: boolean;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { page: number; limit: number }>({
      query: ({ page, limit }) => `posts?_page=${page}&_limit=${limit}`,
    }),
    deletePostFromApi: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useDeletePostFromApiMutation } = postsApi;
