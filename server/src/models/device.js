// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestampPlugin = require('./plugins/timestamp')

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
  feeds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feed",
    },
  ],
  description: String,
});

deviceSchema.plugin(timestampPlugin)

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
