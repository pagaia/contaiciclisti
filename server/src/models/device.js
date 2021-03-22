// External Dependancies
const mongoose = require("mongoose");

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

const feed = new mongoose.Schema(
  {
    hourly: Number,
    hourlyDay: Number,
    daily: Number,
    battery: Number,
    gmsErrorNumber: Number,
    htmlErrorNumber: Number,
    sendErrorNumber: Number,
    yesterday: Number,
  },
  { timestamps: true }
);

const device = new mongoose.Schema(
  {
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
    feeds: [feed],
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", device);
