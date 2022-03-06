const express = require("express");
const notesRouter = express.Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (request, response) => {
  const results = await Note.find({}).populate("userId", { username: 1, name: 1 });
  response.json(results);
});

notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id).populate("userId", { username: 1, name: 1 });
  note ? res.json(note) : res.status(404).end();
});

notesRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findById(body.userId);
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    userId: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  res.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (req, res) => {
  await Note.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

notesRouter.put("/:id", async (req, res) => {
  const { content, important } = req.body;
  const note = { content, important };
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true, runValidators: true, context: "query" });
  res.json(updatedNote);
});

module.exports = notesRouter;
