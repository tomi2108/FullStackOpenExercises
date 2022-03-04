require("dotenv").config();

const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const app = express();
const Entry = require("./models/Entry");
const { response } = require("express");

const PORT = process.env.PORT || 3001;

const configureMorgan = (tokens, req, res) => {
  return [tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), tokens.res(req, res, "content-length"), "-", tokens["response-time"](req, res), "ms", JSON.stringify(req.body)].join(" ");
};

app.use(express.static("build"));
app.use(morgan(configureMorgan));
app.use(express.json());
app.use(cors());

app.get("/info", (req, res) => {
  const date = new Date();
  Entry.find({}).then((results) => {
    const entries = results.length;
    const string = "<p>Phonebook has info for " + entries + " people <br/>" + date + "</p> ";
    res.send(string);
  });
});

app.get("/api/persons/", (req, res, next) => {
  Entry.find({})
    .then((results) => res.json(results))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Entry.findById(req.params.id)
    .then((person) => (person ? res.json(person) : res.status(404).end()))
    .catch((err) => next(err));
});
app.put("/api/persons/:id", (req, res, next) => {
  const person = { name: req.body.name };
  Entry.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/persons/", (req, res, next) => {
  const name = req.body.name;
  const number = req.body.number;
  if (!(name && number)) return res.status(400).json({ error: "name or number missing" });
  const newPerson = new Entry({
    name: name,
    number: number,
  });
  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") return res.status(400).send({ error: "malformatted id" });
  next(error);
};
app.use(errorHandler);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
