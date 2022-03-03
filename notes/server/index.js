require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/notes");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

app.get("/api/notes", (request, response) => {
  Note.find({}).then((results) => {
    response.json(results);
  });
});

app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id).then((note) => res.json(note));
});

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id).then(() => res.status(204).end());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
