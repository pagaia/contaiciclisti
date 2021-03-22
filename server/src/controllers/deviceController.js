// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");

const DUPLICATE_REGEX = new RegExp("E11000 duplicate key error collection");

// Get all devices
exports.getDevices = (fastify) => async (req, reply) => {
  try {
    const devices = await Device.find();
    return devices;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single device by ID
exports.getDeviceById = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;
    const device = await Device.findById(id);
    return device;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new device
exports.addDevice = (fastify) => async (req, reply) => {
  try {
    const device = new Device(req.body);
    const result = await device.save();
    reply.code(201).send(result);
  } catch (err) {
    if (DUPLICATE_REGEX.test(err)) {
      reply
        .code(409)
        .type("application/json")
        .send({ error: "Duplicate Object. Please check you data" });
    } else {
      throw boom.boomify(err);
    }
  }
};

// Update an existing device
exports.updateDevice = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;
    const { ...updateData } = req.body;

    const updatedDevice = await Device.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedDevice) {
      return fastify.notFound(req, reply);
    }
    return updatedDevice;
  } catch (err) {
    if (DUPLICATE_REGEX.test(err)) {
      reply
        .code(409)
        .type("application/json")
        .send({ error: "Duplicate Object. Please check you data" });
    }
    return fastify.notFound(req, reply);
  }
};

// Delete a device
exports.deleteDevice = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;
    const device = await Device.findByIdAndRemove(id);
    if (!device) {
      return fastify.notFound(req, reply);
    }
    return device;
  } catch (err) {
    boom.boomify(err);
    return fastify.notFound(req, reply);
  }
};

// Add a new feed
exports.addFeed = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;
    const feed = req.body;

    let device = await Device.findById(id);
    if (!device) {
      return fastify.notFound(req, reply);
    }
    device.feeds.push(feed);
    device = await device.save();
    reply.code(201).send(device.feeds);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get all device feeds
exports.getFeedsByDeviceId = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;
    const devices = await Device.findById(id);
    if (!devices) {
      return fastify.notFound(req, reply);
    }
    return devices.feeds;
  } catch (err) {
    throw boom.boomify(err);
  }
};
