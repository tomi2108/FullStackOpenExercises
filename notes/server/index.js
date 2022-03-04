require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/notes");
const { response } = require("express");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

app.get("/api/notes", (request, response, next) => {
  Note.find({})
    .then((results) => {
      response.json(results);
    })
    .catch((err) => next(err));
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => (note ? res.json(note) : res.status(404).end()))
    .catch((error) => {
      next(error);
    });
});

app.post("/api/notes", (req, res, next) => {
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

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.put("/api/notes/:id", (req, res, next) => {
  const { content, important } = req.body;
  const note = { content, important };
  Note.findByIdAndUpdate(req.params.id, note, { new: true, runValidators: true, context: "query" })
    .then((updatedNote) => res.json(updatedNote))
    .catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") return response.status(400).send({ error: "malformatted id" });
  if (error.name === "ValidationError") return response.status(400).json({ error: "content missing" });

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
