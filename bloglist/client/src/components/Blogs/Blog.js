import { Button, TableCell } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog } from "../../reducers/blogsReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(deleteBlog(blog));
  };

  return (
    <>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>

      <TableCell align="right">
        <Button variant="outlined" onClick={remove}>
          delete
        </Button>
      </TableCell>
    </>
  );
};

export default Blog;
