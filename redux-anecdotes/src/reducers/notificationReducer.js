import { createSlice } from "@reduxjs/toolkit";
const initialState = { message: "", timerId: 0 };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return { ...state, message: action.payload };
    },
    hideNotification(state, action) {
      return { ...state, message: "" };
    },
    setTimer(state, action) {
      return { ...state, timerId: action.payload };
    },
    clearTimer(state, action) {
      if (state.timerId !== 0) clearTimeout(state.timerId);
      return { ...state, timerId: 0 };
    },
  },
});

export const { hideNotification, showNotification, setTimer, clearTimer } = notificationSlice.actions;

export const setNotification = (notification, time) => {
  return (dispatch) => {
    dispatch(clearTimer());
    dispatch(showNotification(notification));
    const timerId = setTimeout(() => dispatch(hideNotification()), time * 1000);
    console.log(timerId);
    dispatch(setTimer(timerId));
  };
};

export default notificationSlice.reducer;
