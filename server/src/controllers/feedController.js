// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");
const Feed = require("../models/feed");
const { compare, formatTimeZone } = require("../utility/commonFunctions");
const { downloadResource } = require("../utility/downloadCsv");

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

        const filter = { entry_id: feed.entry_id };
        const upInsert = feed;
        const createdFeed = await Feed.findOneAndUpdate(filter, upInsert, {
          new: true,
          upsert: true, // Make this update into an upsert
        });
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

    return feeds.then((response) => {
      reply.code(201).send(response);
    });
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

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
        created_at: {
          $gte: mindate,
          $lte: maxdate,
        },
      },
    });

    let feeds = fullDevice.feeds.sort(compare);
    // return created_at with requested timezone
    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          created_at: formatTimeZone(feed.created_at, tzString),
          updated_at: formatTimeZone(feed.updated_at, tzString),
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
      created_at: {
        $gte: mindate,
        $lte: maxdate,
      },
    })
      .lean()
      .sort({ created_at: "asc" });

    if (!feeds) {
      return fastify.notFound(req, reply);
    }

    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          created_at: formatTimeZone(feed.created_at, tzString),
          updated_at: formatTimeZone(feed.updated_at, tzString),
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
      created_at: {
        $gte: mindate,
        $lte: maxdate,
      },
    })
      .lean()
      .sort({ created_at: "asc" });

    if (!feeds) {
      return fastify.notFound(req, reply);
    }

    const fields = [
      "created_at",
      "entry_id",
      "field1",
      "field2",
      "field3",
      "field4",
      "field5",
      "field6",
      "field7",
      "field8",
    ];

    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          created_at: formatTimeZone(feed.created_at, tzString),
          updated_at: formatTimeZone(feed.updated_at, tzString),
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
