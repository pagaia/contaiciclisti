// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");

// Get all devices
exports.getDevices = async (req, reply) => {
  try {
    const devices = await Device.find();
    return devices;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single device by ID
exports.getDeviceById = async (req, reply) => {
  try {
    const id = req.params.id;
    const device = await Device.findById(id);
    return device;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new device
exports.addDevice = async (req, reply) => {
  try {
    const device = new Device(req.body);
    const result = await device.save();
    reply.code(201).send(result);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing device
exports.updateDevice = async (req, reply) => {
  try {
    const id = req.params.id;
    const device = req.body;
    const { ...updateData } = device;
    const update = await Device.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a device
exports.deleteDevice = async (req, reply) => {
  try {
    const id = req.params.id;
    const device = await Device.findByIdAndRemove(id);
    return device;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new feed
exports.addFeed = async (req, reply) => {
  try {
    const id = req.params.id;
    const feed = req.body;

    const device = await Device.findById(id);
    device.feeds.push(feed);
    return device.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};


// Get all device feeds
exports.getFeedsByDeviceId = async (req, reply) => {
  try {
    const id = req.params.id;
    const devices = await Device.findById(id);
    return devices.feeds;
  } catch (err) {
    throw boom.boomify(err);
  }
};
