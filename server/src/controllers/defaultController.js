"use strict";

const boom = require("boom");
const security = require("../utility/security");

// Get Data Models
const User = require("../models/user");
const CONST = require("../utility/constants");
const Device = require("../models/device");

// Get all users

// curl -X GET "http://localhost:8081/api/devices/6080c0c66f50c788cb70d8cd" \
// -H  "accept: application/json" \
// -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiV2VsY29tZSIsImlhdCI6MTYxOTM4NzY2Mn0.OWW0MO_R9s5dRfUlCM7YTBBlcJjya2GuhMK4cXndLX4"

// curl -X POST "http://localhost:8081/api/devices/6080c0c66f50c788cb70d8cd/generateToken" -H  "accept: application/json" -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiV2VsY29tZSIsImlhdCI6MTYxOTM4NzY2Mn0.OWW0MO_R9s5dRfUlCM7YTBBlcJjya2GuhMK4cXndLX4"

// generate JWT temporary token per selected user
exports.generateJWT = (fastify) => async (req, reply) => {
  try {
    const token = fastify.jwt.sign({ message: "Welcome" }, { expiresIn: "15m" });
    console.log({ token });
    return reply.send({ token });
  } catch (err) {
    throw boom.boomify(err);
  }
};
