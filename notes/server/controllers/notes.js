const notesRouter = require("express").Router();

const { hasValidToken } = require("../utils/middleware");

const Note = require("../models/Note");
const User = require("../models/User");

notesRouter.get("/", async (request, response) => {
  const results = await Note.find({});
  response.json(results);
});

notesRouter.get("/:username", async (request, response) => {
  const users = await User.find({ username: request.params.username }).populate("notes", { content: 1, date: 1, important: 1 });
  const user = users[0];
  user.notes.forEach((n) => (n.user = user.id));
  response.json(user.notes);
});

notesRouter.post("/", async (req, res) => {
  const body = req.body;
  const decodedToken = hasValidToken(req);
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
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
  const note = req.body;

  const userOfNote = await User.findById(note.user);

  const decodedToken = hasValidToken(req);
  const userOfToken = await User.findById(decodedToken.id);

  if (userOfToken._id.toString() === userOfNote._id.toString()) {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true, runValidators: true, context: "query" });
    console.log(updatedNote);
    res.json(updatedNote);
  } else {
    res.status(401).send({ error: "cannot update notes from another user" });
  }
});

module.exports = notesRouter;
