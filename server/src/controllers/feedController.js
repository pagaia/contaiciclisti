// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");
const Feed = require("../models/feed");
const {
  compareCreatedAt,
  formatTimeZone,
  getLastDayPreviousMonth
} = require("../utility/commonFunctions");
const { downloadResource } = require("../utility/downloadCsv");
const zonedTimeToUtc = require("date-fns-tz/zonedTimeToUtc");

/**
 * add a single feed per device
 * @param {obj} fastify
 * @returns
 */
exports.addFeed = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const newFeed = {
      ...req.body,
      device: deviceId // link device with feed
    };

    // first find the device
    let updatedDevice = await Device.findById(deviceId);
    if (!updatedDevice) {
      return reply
        .code(404)
        .type("application/json")
        .send({ error: `Device with ID ${deviceId} Not Found` });
    }

    const createdFeed = await Feed.create(newFeed);

    const updateDevice = await Device.findByIdAndUpdate(
      deviceId,
      {
        // pushing the new feed to link them
        $push: {
          feeds: createdFeed._id
        }
      },
      {
        safe: true,
        upsert: true,
        new: true
      }
    );
    console.log({ createdFeed });
    reply.code(201).send(createdFeed);
  } catch (err) {
    throw boom.boomify(err);
  }
};

/**
 * Add a list of feeds to a device
 * @param {obj} fastify
 * @returns
 */
exports.addMultiFeeds = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    let now = Date.now();

    let updatedDevice = await Device.findById(deviceId);
    if (!updatedDevice) {
      return reply
        .code(404)
        .type("application/json")
        .send({ error: `Device with ID ${deviceId} Not Found` });
    }

    // add deviceId into each feed
    const feeds = req.body.map((feed) => ({
      ...feed,
      device: deviceId
    }));

    const feedsIds = feeds.map((feed) => feed.entry_id);
    let feedInserted = await Feed.insertMany(feeds);

    // link new feeds previously added
    updatedDevice = await Device.findByIdAndUpdate(
      deviceId,
      {
        // pushing the feeds ids just created
        $push: {
          feeds: feedInserted.map((doc) => doc._id)
        }
      },
      {
        safe: true,
        upsert: true,
        new: true
      }
    );

    const oldFeeds = await Feed.find(
      {
        entry_id: { $in: feedsIds },
        device: deviceId,
        updated_at: { $lt: now }
      },
      "_id" // return only the _id object
    );

    oldFeeds.forEach((feedId) => {
      // remove each feed from Device
      updatedDevice.feeds.pull(feedId);
    });

    const affected = await updatedDevice.save();

    // Deleting all old feeds which are replaced
    const oldFeedsIds = oldFeeds.map((feed) => feed._id);
    const deletedFeeds = await Feed.deleteMany({
      _id: { $in: oldFeedsIds },
      device: deviceId,
      updated_at: { $lt: now }
    });

    return reply.code(201).send(updatedDevice);
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
    throw Error(err);
  }
};

// Search feeds and return also the device
exports.searchFeeds = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const currentDate = new Date();

    const tzString = req.query.timezone;

    // set by default last month if start is not define
    const isoDate = req.query.start || getLastDayPreviousMonth();
    const mindate = zonedTimeToUtc(isoDate, tzString);
    const maxdate = zonedTimeToUtc(req.query.end || currentDate, tzString);

    const foundDevice = await Device.findById(deviceId)
      .populate({
        path: "feeds",
        match: {
          created_at: {
            $gte: mindate,
            $lte: maxdate
          }
        }
      })
      .lean();

    if (!foundDevice) {
      return fastify.notFound(req, reply);
    }

    let feeds = foundDevice.feeds.sort(compareCreatedAt);

    // return created_at with requested timezone
    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          created_at: formatTimeZone(feed.created_at, tzString)
          // updated_at: formatTimeZone(feed.updated_at, tzString),
        };
        return newFeed;
      });
    }

    return { ...foundDevice, feeds };
  } catch (err) {
    boom.boomify(err);
    fastify.errorHandler(err, req, reply);
  }
};

// Search feeds only
exports.searchFeedsOnly = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const currentDate = new Date();
    const tzString = req.query.timezone;

    let updatedDevice = await Device.findById(deviceId);
    if (!updatedDevice) {
      return reply
        .code(404)
        .type("application/json")
        .send({ error: `Device with ID ${deviceId} Not Found` });
    }

    // set by default last month if start is not define
    const isoDate = req.query.start || getLastDayPreviousMonth();
    const mindate = zonedTimeToUtc(isoDate, tzString);
    const maxdate = zonedTimeToUtc(req.query.end || currentDate, tzString);

    let feeds = await Feed.find({
      created_at: {
        $gte: mindate,
        $lte: maxdate
      }
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
          updated_at: formatTimeZone(feed.updated_at, tzString)
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

// Search feeds and return a cvs file stream
exports.searchFeedsCsv = (fastify) => async (req, reply) => {
  try {
    const currentDate = new Date();
    const tzString = req.query.timezone;

    // set by default last month if start is not define
    const isoDate = req.query.start || getLastDayPreviousMonth();
    const mindate = zonedTimeToUtc(isoDate, tzString);
    const maxdate = zonedTimeToUtc(req.query.end || currentDate, tzString);

    let feeds = await Feed.find({
      created_at: {
        $gte: mindate,
        $lte: maxdate
      }
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
      "field8"
    ];

    if (tzString) {
      feeds = feeds.map((feed) => {
        const newFeed = {
          ...feed,
          created_at: formatTimeZone(feed.created_at, tzString),
          updated_at: formatTimeZone(feed.updated_at, tzString)
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

// Delete feeds by Device ID
exports.deleteFeedsByDeviceID = (fastify) => async (req, reply) => {
  try {
    const id = req.params.id;

    const feeds = await Feed.deleteMany({ "device._id": id });

    if (!feeds) {
      return fastify.notFound(req, reply);
    }

    const updateDevice = await Device.updateMany(
      { _id: id },
      { $set: { feeds: [] } }
    );

    reply
      .code(200)
      .type("application/json")
      .send({ message: `Deleted all feeds for device with ID: ${id}` });
  } catch (err) {
    boom.boomify(err);
    return fastify.notFound(req, reply);
  }
};
