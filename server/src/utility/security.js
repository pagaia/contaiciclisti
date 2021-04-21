const bcrypt = require("bcrypt");
const Boom = require("boom");
const User = require("../models/user");
const Device = require("../models/device");

const genKey = () => {
  //create a base-36 string that is always 30 chars long a-z0-9
  // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
  const apiKey = [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("")
    .toUpperCase();

  return apiKey;
};

const createToken = async (user, req) => {
  const accessTokenPlain = genKey();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(accessTokenPlain, salt, null);

    return { accessTokenPlain, hash };
  } catch (err) {
    Boom.boomify(err);
    throw err;
  }
};

const validateToken = async (req, reply) => {
  let tokenHost = req.headers.origin;
  let deviceId = req.params.id;
  let api_key = req.headers["x-api-token"]; //version 3 using a header
  console.log({ tokenHost, deviceId, api_key });

  try {
    const device = await Device.findOne({
      _id: deviceId,
    }).exec();

    if (!device) {
      return reply
        .code(404)
        .type("application/json")
        .send({ error: "Not Found" });
    }

    const isMatch = await device.compareToken(api_key);

    // check only the token without matching the host
    if (isMatch) {
      console.log("API key match");
      console.log("tokenHost match");
    } else {
      reply.code(401).send({ error: "Unauthorized" });
      return;
    }
    console.log({ isMatch });
    console.log({ userToken: device.tokenHost, tokenHost });
    // no error should be returned is fine then
  } catch (err) {
    Boom.boomify(err);
    throw err;
  }
};

module.exports = { createToken, validateToken };
