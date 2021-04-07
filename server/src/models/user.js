// External Dependancies
const mongoose = require("mongoose");
const timestampPlugin = require("./plugins/timestamp");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Boom = require("boom");

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
  accessToken: String,
  tokenCreationDate: Date,
  tokenHost: String,
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
});

userSchema.plugin(timestampPlugin);

userSchema.methods.compareToken = function compareToken(providedToken) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(providedToken, this.accessToken, (err, isMatch) => {
      if (err) {
        Boom.boomify(err);
        reject(err);
      }
      console.log({providedToken, accessTokennn:this.accessToken})
      console.log({isMatch})
      resolve(isMatch);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
