import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useField } from "./../hooks/index";
import { LOGIN } from "./../queries";

const LoginForm = ({ setErrorMessage, setToken, setUser }) => {
  const username = useField("text");
  const password = useField("password");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const { token, username } = result.data.login;
      setToken(token);
      setUser(username);
      localStorage.setItem("libraryUser", token);
    }
  }, [result.data]); //eslint-disable-line

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username: username.input.value, password: password.input.value } });
    username.reset();
    password.reset();
  };

  return (
    <form onSubmit={submit}>
      <div>
        user:
        <input {...username.input} />
      </div>
      <div>
        password:
        <input {...password.input} />
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
