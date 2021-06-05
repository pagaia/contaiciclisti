// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestampPlugin = require("./plugins/timestamp");
const bcrypt = require("bcrypt");
const Boom = require("boom");

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: pointSchema,
    required: true,
    index: "2dsphere", // Create a special 2dsphere index on `device.location`
  },
  accessToken: String,
  tokenCreationDate: Date,
  tokenHost: String,
  channelId: Number, // to keep the synchronisation with thingspeak
  feeds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feed",
    },
  ],
  newColor: String,
  active: Boolean,
  description: String,
});

deviceSchema.plugin(timestampPlugin);

deviceSchema.methods.compareToken = function compareToken(providedToken) {
  return new Promise((resolve, reject) => {
    console.log({providedToken, accessToken: this.accessToken})
    resolve(providedToken === this.accessToken);
    // bcrypt.compare(providedToken, this.accessToken, (err, isMatch) => {
    //   if (err) {
    //     Boom.boomify(err);
    //     reject(err);
    //   }
    //   console.log({ providedToken, accessToken: this.accessToken });
    //   console.log({ isMatch });
    //   resolve(isMatch);
    // });
  });
};

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
