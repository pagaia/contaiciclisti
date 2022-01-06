// External Dependancies
const mongoose = require("mongoose");
const timestampPlugin = require("./plugins/timestamp");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  // devices linked to the user
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
});

userSchema.plugin(timestampPlugin);

const User = mongoose.model("User", userSchema);
module.exports = User;
