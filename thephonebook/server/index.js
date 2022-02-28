const express = require("express");
var morgan = require("morgan");
const app = express();

const configureMorgan = (tokens, req, res) => {
  return [tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), tokens.res(req, res, "content-length"), "-", tokens["response-time"](req, res), "ms", JSON.stringify(req.body)].join(" ");
};

app.use(morgan(configureMorgan));
app.use(express.json());

const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const date = new Date();
  const entries = persons.length;
  const string = "<p>Phonebook has info for " + entries + " people <br/>" + date + "</p> ";
  return res.send(string);
});

app.get("/api/persons/", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  const id = Math.floor(Math.random() * 5000) + 1;
  if (!(name && number)) return res.status(400).json({ error: "name or number missing" });
  const namesArr = persons.map((p) => p.name);
  if (namesArr.includes(name)) return res.status(400).json({ error: "name must be unique" });

  const newPerson = {
    id: id,
    name: name,
    number: number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
