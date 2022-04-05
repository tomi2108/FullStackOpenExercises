require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI; // eslint-disable-line no-undef

module.exports = mongoose.connect(MONGODB_URI);
