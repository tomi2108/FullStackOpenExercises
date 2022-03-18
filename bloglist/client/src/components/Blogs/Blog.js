import React from "react";
import { useDispatch } from "react-redux";

import { deleteBlog } from "../../reducers/blogsReducer";

import { TableCell, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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
