import React from "react";
import { useDispatch } from "react-redux";

import Notification from "../Notification";
import Togglable from "../Togglable";
import LoginForm from "../LoginForm";

import { login } from "../../reducers/userReducer";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    dispatch(login(credentials));
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
