import Container from "@material-ui/core/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogsPage from "./components/pages/BlogsPage";
import LoginPage from "./components/pages/LoginPage";
import { initializeAllBlogs } from "./reducers/blogsReducer";
import { login } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const userJson = window.localStorage.getItem("loggedBlogAppUser");
    if (userJson) {
      const userParsed = JSON.parse(userJson);
      dispatch(login(userParsed));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeAllBlogs());
    }
  }, [user, dispatch]);

  return (
    <Container>{!user ? <LoginPage /> : <BlogsPage user={user} />}</Container>
  );
};

export default App;
