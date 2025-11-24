import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../services/postsApi";

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload.map((p) => ({
        ...p,
        liked: p.liked ?? false,
      }));
    },
    toggleLike(state, action: PayloadAction<number>) {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) post.liked = !post.liked;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setPosts, toggleLike, addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
