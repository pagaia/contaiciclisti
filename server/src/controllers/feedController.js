// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");
const Feed = require("../models/feed");

/**
 * add a single feed per device
 * @param {obj} fastify
 * @returns
 */
exports.addFeed = (fastify) => (req, reply) => {
  try {
    const deviceId = req.params.id;
    const newFeed = {
      ...req.body,
      device: deviceId, // link device with feed
    };
    console.log({ newFeed });

    Feed.create(newFeed, (err, createdFeed) => {
      if (err) {
        boom.boomify(err);
        reply.send(err.message);
      } else {
        Device.findByIdAndUpdate(
          deviceId,
          {
            // pushing the new feed to link them
            $push: {
              feeds: createdFeed._id,
            },
          },
          {
            safe: true,
            upsert: true,
          },

          (err, feed) => {
            console.log({ createdFeed });
            if (err) {
              boom.boomify(err);
              reply.send(err.message);
            } else {
              reply.code(201).send(createdFeed);
            }
          }
        );
      }
    });
  } catch (err) {
    throw boom.boomify(err);
  }
};

/**
 * Add a list of feeds per device
 * @param {obj} fastify
 * @returns
 */
exports.addMultiFeeds = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const error = false;
    const addedFeed = [];

    const feeds = Promise.all(
      req.body.map(async (feed) => {
        const newFeed = {
          ...feed,
          device: deviceId, // link device with feed
        };
        console.log({ newFeed });

        const createdFeed = await Feed.create(newFeed);
        const updatedDevice = await Device.findByIdAndUpdate(
          deviceId,
          {
            // pushing the new feed to link them
            $push: {
              feeds: createdFeed._id,
            },
          },
          {
            safe: true,
            upsert: true,
          }
        );

        console.log({ createdFeed });

        return createdFeed;
      })
    );

    console.log({ feeds });
    feeds.then((response) => {
      reply.code(201).send(response);
    });
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

// TODO to be removed or limit the length
// Get all feeds by Device id
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

// Search feeds
exports.searchFeeds = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const currentDate = new Date();

    // set by default last month if not passed
    const mindate =
      req.query.start ||
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);
    const maxdate = req.query.end || currentDate;

    console.log({ mindate, maxdate });

    const foundDevice = Device.findById(deviceId);

    if (!foundDevice) {
      return fastify.notFound(req, reply);
    }

    const fullDevice = foundDevice.populate({
      path: "feeds",
      match: {
        createdAt: {
          $gte: mindate,
          $lte: maxdate,
        },
      },
    });

    return fullDevice;
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};
