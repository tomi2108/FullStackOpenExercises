import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return "";
    },
  },
});

export const { hideNotification, showNotification } = notificationSlice.actions;

export const setNotification = (notification, time) => {
  return (dispatch) => {
    dispatch(showNotification(notification));
    setTimeout(() => dispatch(hideNotification()), time * 1000);
  };
};

export default notificationSlice.reducer;
