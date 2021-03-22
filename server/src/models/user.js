// External Dependancies
const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      // required: true,
    },
    tokenCreationDate: {
      type: Date,
      // default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);
