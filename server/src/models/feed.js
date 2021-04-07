// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestampPlugin = require('./plugins/timestamp')

const feedSchema = new mongoose.Schema({
  hourly: Number,
  hourlyDay: Number,
  daily: Number,
  battery: Number,
  gmsErrorNumber: Number,
  htmlErrorNumber: Number,
  sendErrorNumber: Number,
  yesterday: Number,
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
});

feedSchema.plugin(timestampPlugin);

const Feed = mongoose.model("Feed", feedSchema);
module.exports = Feed;
