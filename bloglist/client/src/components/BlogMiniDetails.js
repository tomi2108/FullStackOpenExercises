import React from "react";

const BlogMiniDetails = ({ blog }) => {
  return (
    <>
      <p>
        {blog.title} {blog.likes} likes : {blog.author}
      </p>
    </>
  );
};

export default BlogMiniDetails;
