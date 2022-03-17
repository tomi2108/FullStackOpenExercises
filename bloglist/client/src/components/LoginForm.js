import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useField } from "../hooks";

const LoginForm = ({ handleLogin }) => {
  const username = useField("text");
  const password = useField("password");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin({ username: username, password: password });
        username.value = "";
        password.value = "";
      }}
    >
      {" "}
      <div>
        {" "}
        Username:
        <input placeholder="Username" name="Username" {...username} />{" "}
      </div>{" "}
      <div>
        {" "}
        Password:
        <input placeholder="Password" name="Password" {...password} />{" "}
      </div>{" "}
      <Button variant="success" size="sm" type="submit">
        Login
      </Button>{" "}
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
