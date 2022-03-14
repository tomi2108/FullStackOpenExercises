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
    setNotification(state, action) {
      showNotification(action.payload[0]);
      setTimeout(() => hideNotification(), action.payload[1] * 1000);
      return "";
    },
  },
});

export const { showNotification, hideNotification, setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
