import { useDispatch } from "react-redux";
import { login } from "../../reducers/userReducer";
import LoginForm from "../LoginForm";
import Notification from "../Notification";
import Togglable from "../Togglable";

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
