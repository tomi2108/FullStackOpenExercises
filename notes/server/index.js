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
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
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
  const note = { content: req.body.content, important: req.body.important };
  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => res.json(updatedNote))
    .catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
