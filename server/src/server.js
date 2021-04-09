const MONGODB_CONF = require("./config/config");

// Require external modules
const mongoose = require("mongoose");

// Connect to DB
mongoose
  .connect(MONGODB_CONF.url)
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.log(err));

const server = require("./app")({
  logger: {
    level: "info",
    prettyPrint: true,
  },
});

// Run the server!
const start = async () => {
  try {
    await server.listen(8081);
    server.swagger();
    server.log.info(`server listening on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
