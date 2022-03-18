import React from "react";
import PropTypes from "prop-types";
import { useField } from "../hooks";

const LoginForm = ({ handleLogin }) => {
  const username = useField("text");
  const password = useField("password");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin({ username: username.input.value, password: password.input.value });
        username.reset();
        password.reset();
      }}
    >
      <div>
        <label htmlFor="Username">Username:</label>
        <input placeholder="username" name="username" {...username.input} />{" "}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input placeholder="Password" name="password" {...password.input} />{" "}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
