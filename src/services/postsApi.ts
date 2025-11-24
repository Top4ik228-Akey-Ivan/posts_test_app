import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    // добавляем параметры _page и _limit
    getPosts: builder.query<Post[], { page: number; limit: number }>({
      query: ({ page, limit }) => `posts?_page=${page}&_limit=${limit}`,
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
