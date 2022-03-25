import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../reducers/blogsReducer";
import { setNotification } from "../../reducers/notificationReducer";
import AllBlogList from "../Blogs/AllBlogsList";
import SaveBlogForm from "../Blogs/SaveBlogForm";
import Togglable from "../Togglable";

const Home = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObj));
    dispatch(setNotification({ message: `a new blog ${blogObj.title} by ${blogObj.author} added`, variant: "success" }, 5));
  };

  return (
    <div>
      <AllBlogList />
      <Togglable closeLabel="cancel" openLabel="Add blog" ref={blogFormRef}>
        <SaveBlogForm addBlog={addBlog} />
      </Togglable>
    </div>
  );
};

export default Home;
