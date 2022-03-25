import { Paper, Table, TableBody, TableContainer, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import Blog from "./Blog";

const AllBlogsList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogsToSort = [...blogs];

  return (
    <TableContainer component={Paper} id="blogContainer">
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          {blogsToSort
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => {
              return (
                <TableRow style={blogStyle} hover key={blog.id}>
                  <Blog blog={blog} />
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllBlogsList;
