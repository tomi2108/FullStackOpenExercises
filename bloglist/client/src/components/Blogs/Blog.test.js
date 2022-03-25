/* eslint-disable testing-library/no-node-access */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog/>", () => {
  test("renders title, but not author,url or likes by default", async () => {
    const blog = {
      title: "test title",
      author: "tomi",
      url: "tomi.com",
      likes: 50,
    };
    const container = render(<Blog blog={blog} />).container;
    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent(blog.title);
    expect(div).not.toHaveTextContent(blog.author);
    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes);
  });
  test("url,author and likes are shown when button is clicked", async () => {
    const blog = {
      title: "test title",
      author: "tomi",
      url: "tomi.com",
      likes: 50,
    };
    const container = render(<Blog blog={blog} />).container;
    const div = container.querySelector(".blog");
    const viewButton = screen.getByText("View");
    userEvent.click(viewButton);

    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);
    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(blog.likes);
  });
  test("if likes buttons is clicked twice, likes functions is called twice", async () => {
    const blog = {
      title: "test title",
      author: "tomi",
      url: "tomi.com",
      likes: 50,
    };

    const mockHandler = jest.fn();

    render(<Blog blog={blog} updateBlog={mockHandler} />);
    const viewButton = screen.getByText("View");
    userEvent.click(viewButton);

    const likeButton = screen.getByText("like");
    userEvent.click(likeButton);
    userEvent.click(likeButton);
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
