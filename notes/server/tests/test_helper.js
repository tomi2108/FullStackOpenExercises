const bcrypt = require("bcrypt");
const Note = require("../models/Note");
const User = require("../models/User");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialNotes = [
  {
    content: "initial_1",
    date: new Date(),
    important: false,
  },
  {
    content: "initial_2",
    date: new Date(),
    important: true,
  },
];

const setRootUser = async () => {
  const passwordHash = await bcrypt.hash("secretPassword", 10);
  const rootUser = { name: "admin", username: "root", passwordHash: passwordHash, notes: [] };
  const user = new User(rootUser);
  await user.save();
};
const getRootUser = async () => {
  const user = await User.findOne({ username: "root" });
  return user;
};

const setInitialNotes = async () => {
  const rootUser = await getRootUser();
  initialNotes.forEach((note) => (note.user = rootUser._id));
  const notesObjects = initialNotes.map((note) => new Note(note));
  const promiseArray = notesObjects.map((obj) => obj.save());
  await Promise.all(promiseArray);

  const notes = await Note.find({});
  const notesId = notes.map((note) => note._id);
  rootUser.notes = notesId;
  await rootUser.save();
};

const getInitialNotes = async () => {
  const notes = await Note.find({ content: "initial" });
  return notes;
};

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon", date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  api,
  initialNotes,
  setRootUser,
  setInitialNotes,
  getRootUser,
  getInitialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
