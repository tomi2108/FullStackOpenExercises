const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};
const favoriteBlog = (blogs) => {
  let favoriteBlog = { likes: 0 };
  blogs.forEach((blog) => {
    if (blog.likes > favoriteBlog.likes) favoriteBlog = blog;
  });
  return { title: favoriteBlog.title, author: favoriteBlog.author, likes: favoriteBlog.likes };
};

const mostBlogs = (blogs) => {
  const authors = [];
  blogs.forEach((blog) => {
    const blogObj = authors.find((obj) => obj.author === blog.author);
    if (blogObj) {
      blogObj.blogs += 1;
    } else {
      authors.push({ author: blog.author, blogs: 1 });
    }
  });
  const max = authors.reduce((prev, current) => (prev.blogs > current.blogs ? prev : current));
  return max;
};

const mostLikes = (blogs) => {
  const authors = [];

  blogs.forEach((blog) => {
    const blogObj = authors.find((obj) => obj.author === blog.author);
    if (blogObj) {
      blogObj.likes += blog.likes;
    } else {
      authors.push({ author: blog.author, likes: blog.likes });
    }
  });
  const max = authors.reduce((prev, current) => (prev.likes > current.likes ? prev : current));
  return max;
};

module.exports = {
  mostLikes,
  totalLikes,
  mostBlogs,
  favoriteBlog,
};
