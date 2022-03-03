const mongoose = require("mongoose");
const password = process.argv[2];
const nameToInsert = process.argv[3];
const numberToInsert = process.argv[4];

const url = `mongodb+srv://admin:${password}@cluster0.lscfz.mongodb.net/thePhoneBook?retryWrites=true&w=majority`;
mongoose.connect(url);
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Entry = mongoose.model("Entry", entrySchema);

if (process.argv.length === 3) {
  console.log("phonebook: ");
  Entry.find({}).then((results) => {
    results.forEach((entry) => {
      console.log(entry.name, " ", entry.number);
    });
    mongoose.connection.close();
  });
} else {
  const entry = new Entry({
    name: nameToInsert,
    number: numberToInsert,
  });

  entry.save().then((result) => {
    console.log("added", nameToInsert, "number", numberToInsert, "to phonebook");
    mongoose.connection.close();
  });
}
