import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    updateBlog(state, action) {
      return state.map((b) => (b.id === action.payload.id ? action.payload : b));
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
    eraseBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id);
    },
    emptyBlogs() {
      return [];
    },
  },
});

export const { emptyBlogs, updateBlog, appendBlog, setBlogs, eraseBlog } = blogSlice.actions;

export const initializeUserBlogs = (user) => {
  return async (dispatch) => {
    const blogs = await blogService.getFromUser(user);
    dispatch(setBlogs(blogs));
  };
};

export const initializeAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.erase(blog);
    dispatch(eraseBlog(blog));
  };
};

export const resetBlogs = () => {
  return async (dispatch) => {
    dispatch(emptyBlogs());
  };
};
export const putBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog);
    dispatch(updateBlog(blog));
  };
};

export default blogSlice.reducer;
