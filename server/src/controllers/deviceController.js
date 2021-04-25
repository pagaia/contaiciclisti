// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");
const CONST = require("../utility/constants");
const security = require("../utility/security");

// generate Key per device
exports.generateToken = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const device = await Device.findById(deviceId);
    if (!device) {
      return fastify.notFound(req, reply);
    }
    const { accessTokenPlain, hash } = await security.createToken(
      device,
      req
    );

    device.tokenHost = req.headers.origin;
    device.tokenCreationDate = new Date();
    device.accessToken = hash;
    // save the enhanced user
    const res = await device.save();
    return accessTokenPlain;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new device
exports.addDevice = (fastify) => async (req, reply) => {
  try {
    const device = new Device(req.body);

    // create the token along with the device
    const { accessTokenPlain, hash } = await security.createToken(
      device,
      req
    );

    device.tokenHost = req.headers.origin;
    device.tokenCreationDate = new Date();
    // save the hash in the DB
    device.accessToken = hash;
    const result = await device.save();

    // return the plain token along with the device information
    // this is the only time the user can save the token
    result.accessToken = accessTokenPlain;

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
