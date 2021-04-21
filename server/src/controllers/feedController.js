// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");
const Feed = require("../models/feed");
const { compare, formatTimeZone } = require("../utility/commonFunctions");
const { downloadResource } = require("../utility/downloadCsv");
const { utcToZonedTime, format } = require("date-fns-tz");

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

        return createdFeed;
      })
    );

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
// exports.getFeedsByDeviceId = (fastify) => async (req, reply) => {
//   try {
//     const id = req.params.id;
//     const tzString = req.query.timezone;
//     const devices = await Device.findById(id);
//     if (!devices) {
//       return fastify.notFound(req, reply);
//     }

//     // return createdAt with requested timezone
//     if (tzString) {
//       return devices.feeds.map((feed) => ({
//         ...feed,
//         createdAt: feed.createdAt.toLocaleString("en-US", {
//           timeZone: tzString,
//         }),
//         updatedAt: feed.updatedAt.toLocaleString("en-US", {
//           timeZone: tzString,
//         }),
//       }));
//     }

//     return devices.feeds;
//   } catch (err) {
//     throw boom.boomify(err);
//   }
// };

// Search feeds
exports.searchFeeds = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const currentDate = new Date();
    const tzString = req.query.timezone;

    // set by default last month if not passed
    const mindate =
      req.query.start ||
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);
    const maxdate = req.query.end || currentDate;

    const foundDevice = Device.findById(deviceId).lean();

    if (!foundDevice) {
      return fastify.notFound(req, reply);
    }

    const fullDevice = await foundDevice.populate({
      path: "feeds",
      match: {
        createdAt: {
          $gte: mindate,
          $lte: maxdate,
        },
      },
    });

    let feeds = fullDevice.feeds.sort(compare);
    // return createdAt with requested timezone
    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          createdAt: formatTimeZone(feed.createdAt, tzString),
          updatedAt: formatTimeZone(feed.updatedAt, tzString),
        };
        return newFeed;
      });
    }

    return { ...fullDevice, feeds };
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

// Search feeds
exports.searchFeedsOnly = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const currentDate = new Date();
    const tzString = req.query.timezone;

    // set by default last month if not passed
    const mindate =
      req.query.start ||
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);
    const maxdate = req.query.end || currentDate;

    let feeds = await Feed.find({
      createdAt: {
        $gte: mindate,
        $lte: maxdate,
      },
    })
      .lean()
      .sort({ createdAt: "asc" });

    if (!feeds) {
      return fastify.notFound(req, reply);
    }

    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          createdAt: formatTimeZone(feed.createdAt, tzString),
          updatedAt: formatTimeZone(feed.updatedAt, tzString),
        };
        return newFeed;
      });
    }

    reply.send(feeds);
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

// Search feeds
exports.searchFeedsCsv = (fastify) => async (req, reply) => {
  try {
    const currentDate = new Date();
    const tzString = req.query.timezone;

    // set by default last month if not passed
    const mindate =
      req.query.start ||
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);
    const maxdate = req.query.end || currentDate;

    let feeds = await Feed.find({
      createdAt: {
        $gte: mindate,
        $lte: maxdate,
      },
    })
      .lean()
      .sort({ createdAt: "asc" });

    if (!feeds) {
      return fastify.notFound(req, reply);
    }

    const fields = [
      "createdAt",
      "entry_id",
      "feed1",
      "feed2",
      "feed3",
      "feed4",
      "feed5",
      "feed6",
      "feed7",
      "feed8",
    ];

    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          createdAt: formatTimeZone(feed.createdAt, tzString),
          updatedAt: formatTimeZone(feed.updatedAt, tzString),
        };
        return newFeed;
      });
    }

    downloadResource(reply, "feeds.csv", fields, feeds);
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};
