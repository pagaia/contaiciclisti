// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestampPlugin = require("./plugins/timestamp");

const feedSchema = new mongoose.Schema({
  field1: Number,
  field2: Number,
  field3: Number,
  field4: Number,
  field5: Number,
  field6: Number,
  field7: Number,
  field8: Number,
  entry_id: { type: Number, unique: true },
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  updated_at: { type: Date, default: Date.now },
});

feedSchema.plugin(timestampPlugin);

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
