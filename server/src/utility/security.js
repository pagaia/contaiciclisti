const bcrypt = require("bcrypt");
const Boom = require("boom");
const User = require("../models/user");

const genKey = () => {
  //create a base-36 string that is always 30 chars long a-z0-9
  // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
  const apiKey = [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("")
    .toUpperCase();

  return apiKey;
};

const addUserApiKey = async (user, req) => {
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

const validateKey = async (req, reply) => {
  let tokenHost = req.headers.origin;
  console.log(req.headers);
  let api_key = req.headers["x-api-token"]; //version 3 using a header
  let username = req.headers["x-api-user"]; //version 3 using a header

  try {
    const user = await User.findOne({
      username: username?.toLowerCase(),
    }).exec();

    if (!user) {
      reply.code(401).send({ error: "Unauthorized" });
      return;
    }
    const isMatch = await user.compareToken(api_key);

    if (isMatch && user.tokenHost === tokenHost) {
      console.log("API key match");
      console.log("tokenHost match");
    } else {
      reply.code(401).send({ error: "Unauthorized" });
      return;
    }
    console.log({ isMatch });
    console.log({ userToken: user.tokenHost, tokenHost });
  } catch (err) {
    Boom.boomify(err);
    throw err;
  }
};

module.exports = { addUserApiKey, validateKey };
