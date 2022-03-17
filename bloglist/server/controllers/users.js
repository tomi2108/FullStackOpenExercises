const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!(username && password && username.length > 3 && password.length > 3)) return response.status(400).json({ error: "username and password do not meet requirements" });

  const existingUser = await User.findOne({ username: username });
  if (existingUser) return response.status(400).json({ error: "username must be unique" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, likes: 1 });
  response.json(users);
});

userRouter.get("/:username", async (req, res) => {
  const user = await User.find({ username: req.params.username });
  res.json(user);
});
module.exports = userRouter;
