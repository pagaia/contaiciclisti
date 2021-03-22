const boom = require("boom");

// Get Data Models
const User = require("../models/user");
const DUPLICATE_REGEX = require("../utility/constants");

// Get all devices
exports.generateKey = (fastify) => async (req, reply) => {
  try {
    const accessToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const id = req.params.id;
    const user = await User.findById(id);
    user.accessToken = accessToken.toUpperCase();
    const res = await user.save();
    return res;
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
