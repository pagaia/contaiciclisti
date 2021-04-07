"use strict";

const boom = require("boom");
const security = require("../utility/security");

// Get Data Models
const User = require("../models/user");
const CONST = require("../utility/constants");
const Device = require("../models/device");

// generate Key for user
exports.generateKey = (fastify) => async (req, reply) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return fastify.notFound(req, reply);
    }
    const { accessTokenPlain, hash } = await security.addUserApiKey(user, req);

    user.tokenHost = req.headers.origin;
    user.tokenCreationDate = new Date();
    user.accessToken = hash;
    // save the enhanced user
    const res = await user.save();
    return accessTokenPlain;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get all users
exports.getUsers = (fastify) => async (req, reply) => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single User by ID
exports.getUserById = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return fastify.notFound(req, reply);
    }
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new user
exports.addUser = (fastify) => async (req, reply) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    reply.code(201).send(result);
  } catch (err) {
    if (CONST.DUPLICATE_REGEX.test(err)) {
      return reply
        .code(409)
        .type("application/json")
        .send({ error: "Duplicate Object. Please check you data" });
    }

    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

// Update an existing user
exports.updateUser = (fastify) => async (req, reply) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const foundUser = User.findById(userId);
    if (!foundUser) {
      return fastify.notFound(req, reply);
    }
    const updatedUser = await User.findOneAndUpdate(userId, updateData, {
      new: true,
    });

    return updatedUser;
  } catch (err) {
    if (CONST.DUPLICATE_REGEX.test(err)) {
      return reply
        .code(409)
        .type("application/json")
        .send({ error: "Duplicate Object. Please check you data" });
    }
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

// Delete a user
exports.deleteUser = (fastify) => async (req, reply) => {
  try {
    const userId = req.params.id;
    const userFound = await User.findByIdAndRemove(userId);
    if (!userFound) {
      return fastify.notFound(req, reply);
    }
    reply.send(200);
  } catch (err) {
    boom.boomify(err);
    return fastify.notFound(req, reply);
  }
};

// Link device to User
exports.linkDevice = (fastify) => async (req, reply) => {
  try {
    const userId = req.params.userId;
    const deviceId = req.params.deviceId;

    let foundUser = await User.findById(userId);
    const foundDevice = await Device.findById(deviceId);

    if (!foundUser || !foundDevice) {
      return fastify.notFound(req, reply);
    }

    console.log({ foundUser });
    if (
      !foundUser.devices.find((device) => {
        console.log({ device, deviceId });
        return device == deviceId;
      })
    ) {
      console.log(`Device ${deviceId} is not yet linked. Let's add`);
      foundUser.devices.push(deviceId);
      foundUser = await foundUser.save();
    }

    return foundUser;
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

// UnLink device to User
exports.unlinkDevice = (fastify) => async (req, reply) => {
  try {
    const userId = req.params.userId;
    const deviceId = req.params.deviceId;

    let foundUser = await User.findById(userId);
    const foundDevice = await Device.findById(deviceId);

    if (!foundUser || !foundDevice) {
      return fastify.notFound(req, reply);
    }

    console.log({ foundUser });
    if (
      foundUser.devices.find((device) => {
        console.log({ device, deviceId });
        return device == deviceId;
      })
    ) {
      console.log(`Device ${deviceId} is linked. Let's remove it`);
      foundUser.devices = foundUser.devices.filter(
        (device) => device != deviceId
      );
      foundUser = await foundUser.save();
    }

    return foundUser;
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};
