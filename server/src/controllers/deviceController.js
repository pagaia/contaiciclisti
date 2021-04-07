// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");
const Feed = require("../models/feed");

const CONST = require("../utility/constants");

// Add a new device
exports.addDevice = (fastify) => async (req, reply) => {
  try {
    const device = new Device(req.body);
    const result = await device.save();
    reply.code(201).send(result);
  } catch (err) {
    if (CONST.DUPLICATE_REGEX.test(err)) {
      reply
        .code(409)
        .type("application/json")
        .send({ error: "Duplicate Object. Please check you data" });
    } else {
      throw boom.boomify(err);
    }
  }
};

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

    device.populate("feeds").execPopulate();

    return device;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing device
exports.updateDevice = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const foundDevice = Device.findById(id);
    if (!foundDevice) {
      return fastify.notFound(req, reply);
    }
    const updatedDevice = await Device.findOneAndUpdate(id, updateData, {
      new: true,
    });

    return updatedDevice;
  } catch (err) {
    if (CONST.DUPLICATE_REGEX.test(err)) {
      reply
        .code(409)
        .type("application/json")
        .send({ error: "Duplicate Object. Please check you data" });
    }
    fastify.errorHandler(err, req, reply);
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
