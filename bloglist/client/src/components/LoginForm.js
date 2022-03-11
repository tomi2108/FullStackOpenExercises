import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin({ username: username, password: password });
        setUsername("");
        setPassword("");
      }}
    >
      {" "}
      <div>
        {" "}
        Username:
        <input placeholder="Username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />{" "}
      </div>{" "}
      <div>
        {" "}
        Password:
        <input placeholder="Password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />{" "}
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
