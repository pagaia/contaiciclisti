// External Dependancies
const boom = require("boom");

// Get Data Models
const Device = require("../models/device");
const Feed = require("../models/feed");
const {
  compareCreatedAt,
  formatTimeZone
} = require("../utility/commonFunctions");
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
      device: deviceId // link device with feed
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
              feeds: createdFeed._id
            }
          },
          {
            safe: true,
            upsert: true
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

    const feeds = await Promise.all(
      req.body.map(async (feed) => {
        // console.log({ feed });
        const newFeed = {
          ...feed,
          device: deviceId // link device with feed
        };

        const filter = { entry_id: feed.entry_id, "device._id": deviceId };
        // const upInsert = feed;
        // console.log({ filter });
        const createdFeed = await Feed.findOneAndUpdate(filter, feed, {
          new: true,
          upsert: true // Make this update into an upsert
        });
        // console.log({ createdFeed });

        let updatedDevice = await Device.findById(deviceId);
        // console.log(updatedDevice.feeds);
        // if (!updatedDevice.feeds.id(createdFeed._id)) {
        // if device doesn't include the feed let's add it
        if (!updatedDevice.feeds.includes(createdFeed._id)) {
          // console.log("device not found, ", createdFeed._id, updatedDevice);
          updatedDevice = await Device.findByIdAndUpdate(
            deviceId,
            {
              // pushing the new feed to link them
              $push: {
                feeds: createdFeed._id
              }
            },
            {
              safe: true,
              upsert: true
            }
          );
          // console.log({ updatedDevice });
        } else {
          // console.log("device found, nothing to add");
        }

        return updatedDevice;
        return "done";
      })
    );

    // console.log({ feeds });
    return reply.code(201).send({ message: `Feeds added` });

    // Promise.all(feeds).then((response) => {
    //   console.log({ response });
    //   console.log({ message: `Feeds added` });
    //   reply.code(201).send({ message: `Feeds added` });
    // });
  } catch (err) {
    boom.boomify(err);
    // fastify.errorHandler(err, req, reply);
    throw Error(err)
  }
};

// Search feeds
exports.searchFeeds = (fastify) => async (req, reply) => {
  try {
    const deviceId = req.params.id;
    const currentDate = new Date();
    const tzString = req.query.timezone;

    // set by default last month if start is not define
    const mindate =
      req.query.start ||
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 31);

    const maxdate = req.query.end || currentDate;

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

    // const fullDevice = await foundDevice.populate({
    //   path: "feeds",
    //   match: {
    //     created_at: {
    //       $gte: mindate,
    //       $lte: maxdate,
    //     },
    //   },
    // });

    // console.log({ count0: foundDevice.feeds.length });

    let feeds = foundDevice.feeds.sort(compareCreatedAt);
    // console.log({ count1: feeds.length });

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

    // console.log({ count2: feeds.length });
    return { ...foundDevice, feeds };
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
    // console.log({ id });

    const feeds = await Feed.deleteMany({ "device._id": id });
    // console.log({ feeds });
    if (!feeds) {
      return fastify.notFound(req, reply);
    }
    await Device.updateMany({ _id: id }, { $set: { feeds: [] } });

    //   Person.update({name:"james"}, { $set: { friends: [] }}, function(err, affected){
    //     console.log('affected: ', affected);
    // });

    return feeds;
  } catch (err) {
    boom.boomify(err);
    return fastify.notFound(req, reply);
  }
};
