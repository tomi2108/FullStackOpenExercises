import React from "react";
import { useDispatch } from "react-redux";

import Notification from "../Notification";
import Togglable from "../Togglable";
import LoginForm from "../LoginForm";

import { login } from "../../reducers/userReducer";
import { setNotification } from "../../reducers/notificationReducer";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    try {
      dispatch(login(credentials));
    } catch (err) {
      dispatch(setNotification({ message: "wrong username or password", variant: "danger" }, 4));
    }
  };

  return (
    <>
      <h2>Log in to app</h2>
      <Notification />
      <Togglable closeLabel="cancel" openLabel="Show login">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    </>
  );
};

export default LoginPage;
