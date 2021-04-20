// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestampPlugin = require('./plugins/timestamp')

const feedSchema = new mongoose.Schema({
  feed1: Number,
  feed2: Number,
  feed3: Number,
  feed4: Number,
  feed5: Number,
  feed6: Number,
  feed7: Number,
  feed8: Number,
  entry_id: Number,
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
});

feedSchema.plugin(timestampPlugin);

const Feed = mongoose.model("Feed", feedSchema);
module.exports = Feed;
