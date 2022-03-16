import { createSlice } from "@reduxjs/toolkit";
const initialState = { message: "", variant: "", timerId: 0 };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return { ...state, message: action.payload.message, variant: action.payload.variant };
    },
    hideNotification(state) {
      return { ...state, message: null };
    },
    setTimer(state, action) {
      return { ...state, timerId: action.payload };
    },
    clearTimer(state) {
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
    dispatch(setTimer(timerId));
  };
};

export default notificationSlice.reducer;
