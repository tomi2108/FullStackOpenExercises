const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.lscfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/* const noteObj = new Note({
  content: "html dsakdasj",
  date: new Date(),
  important: true,
});

noteObj.save().then((result) => {
  console.log(result);
  console.log("note saved!");
  mongoose.connection.close();
}); */
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
