require("dotenv").config();

const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const app = express();
const Entry = require("./models/Entry");

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

app.get("/api/persons/", (req, res) => {
  Entry.find({}).then((results) => {
    res.json(results);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Entry.findById(req.params.id).then((person) => {
    person ? res.json(person) : res.status(404).end();
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Entry.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  });
});

app.post("/api/persons/", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  if (!(name && number)) return res.status(400).json({ error: "name or number missing" });
  const newPerson = new Entry({
    name: name,
    number: number,
  });
  newPerson.save().then((savedPerson) => res.json(savedPerson));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
