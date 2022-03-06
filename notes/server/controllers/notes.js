const express = require("express");
const notesRouter = express.Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const results = await Note.find({});
  response.json(results);
});

notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  note ? res.json(note) : res.status(404).end();
});

notesRouter.post("/", async (req, res) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  const savedNote = await note.save();
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
