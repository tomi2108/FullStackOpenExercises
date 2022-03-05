const express = require("express");
const notesRouter = express.Router();
const Note = require("../models/note");

notesRouter.get("/", (request, response, next) => {
  Note.find({})
    .then((results) => {
      response.json(results);
    })
    .catch((err) => next(err));
});

notesRouter.get("/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => (note ? res.json(note) : res.status(404).end()))
    .catch((error) => {
      next(error);
    });
});

notesRouter.post("/", (req, res, next) => {
  const body = req.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => next(err));
});

notesRouter.delete("/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body;
  const note = { content, important };
  Note.findByIdAndUpdate(req.params.id, note, { new: true, runValidators: true, context: "query" })
    .then((updatedNote) => res.json(updatedNote))
    .catch((err) => next(err));
});
module.exports = notesRouter;
