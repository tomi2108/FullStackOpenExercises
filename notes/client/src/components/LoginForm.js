import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        handleLogin(e, { username: username, password: password });
        setUsername("");
        setPassword("");
      }}
    >
      {" "}
      <div>
        {" "}
        Username:
        <input id="username" placeholder="Username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />{" "}
      </div>{" "}
      <div>
        {" "}
        Password:
        <input id="password" placeholder="Password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />{" "}
      </div>{" "}
      <Button id="login-btn" variant="success" size="sm" type="submit">
        Login
      </Button>{" "}
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default LoginForm;
