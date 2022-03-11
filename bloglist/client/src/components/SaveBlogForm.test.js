/* eslint-disable testing-library/no-node-access */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SaveBlogForm from "./SaveBlogForm";

test("<SaveBlogForm /> updates parent state and calls onSubmit", () => {
  const creatBlock = jest.fn();

  render(<SaveBlogForm addBlog={creatBlock} />);

  const titleInput = screen.getByPlaceholderText("title...");
  const authorInput = screen.getByPlaceholderText("author...");
  const urlInput = screen.getByPlaceholderText("url...");
  const sendButton = screen.getByText("Save");

  userEvent.type(titleInput, "testing a form...");
  userEvent.type(authorInput, "tester");
  userEvent.type(urlInput, "testing.com");
  userEvent.click(sendButton);

  expect(creatBlock.mock.calls).toHaveLength(1);

  expect(creatBlock.mock.calls[0][0].title).toBe("testing a form...");
  expect(creatBlock.mock.calls[0][0].author).toBe("tester");
  expect(creatBlock.mock.calls[0][0].url).toBe("testing.com");
});
