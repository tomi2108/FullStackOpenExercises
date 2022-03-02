const express = require("express");
const cors = require("cors");

const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-1-17T17:30:31.098Z",
    important: false,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2022-1-17T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-1-17T19:20:14.298Z",
    important: false,
  },
  {
    content: "Hola",
    date: "2022-02-18T15:14:17.312Z",
    important: false,
    id: 4,
  },
  {
    content: "holi",
    date: "2022-02-18T15:14:37.184Z",
    important: false,
    id: 5,
  },
  {
    content: "Hi",
    date: "2022-02-18T15:16:31.663Z",
    important: true,
    id: 6,
  },
  {
    content: "diasiaslkdsa",
    date: "2022-02-19T21:58:53.937Z",
    important: true,
    id: 7,
  },
  {
    content: "testing",
    date: "2022-02-19T21:59:06.452Z",
    important: false,
    id: 9,
  },
  {
    content: "",
    date: "2022-02-19T22:03:07.380Z",
    important: false,
    id: 10,
  },
  {
    content: "",
    date: "2022-02-19T22:03:15.115Z",
    important: false,
    id: 11,
  },
  {
    content: "dsadsasa",
    date: "2022-02-19T22:03:17.122Z",
    important: false,
    id: 12,
  },
  {
    content: "",
    date: "2022-02-21T15:04:28.930Z",
    important: true,
    id: 13,
  },
  {
    content: "",
    date: "2022-02-21T15:50:34.862Z",
    important: false,
    id: 14,
  },
  {
    content: "",
    date: "2022-02-21T15:50:35.742Z",
    important: false,
    id: 15,
  },
];

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  note ? res.json(note) : res.status(404).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
