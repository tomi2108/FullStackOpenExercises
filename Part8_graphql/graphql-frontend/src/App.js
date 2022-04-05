import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const client = useApolloClient();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("libraryUser");
    client.resetStore();
  };
  if (!token) {
    return (
      <>
        <Notification variant="danger" message={errorMessage} />
        <h2>Login</h2>
        <LoginForm setErrorMessage={setErrorMessage} setToken={setToken} setUser={setUser} />
      </>
    );
  }

  return (
    <div>
      <div>
        <Notification variant="danger" message={errorMessage} />
        <div>
          {user} logged in
          <button onClick={handleLogout}>Log out </button>
        </div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook setErrorMessage={setErrorMessage} show={page === "add"} />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
