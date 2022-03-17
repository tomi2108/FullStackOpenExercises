import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUser() {
      window.localStorage.removeItem("loggedBlogAppUser");
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const login = (credentials) => {
  if (credentials.password) {
    return async (dispatch) => {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);

      dispatch(setUser(user));
    };
  } else {
    return async (dispatch) => {
      const loggedUser = credentials;
      blogService.setToken(loggedUser.token);
      dispatch(setUser(loggedUser));
    };
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(removeUser());
  };
};

export default userSlice.reducer;
