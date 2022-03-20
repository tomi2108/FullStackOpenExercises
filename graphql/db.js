const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://admin:admin@cluster0.lscfz.mongodb.net/graphQlDb?retryWrites=true&w=majority";

module.exports = mongoose.connect(MONGODB_URI);
