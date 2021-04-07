const deviceRoutes = require("./routes/device");
const userRoutes = require("./routes/user");
const feedRoutes = require("./routes/feed");

// Import Swagger Options
const swagger = require("./config/swagger");
const { validateKey } = require("./utility/security");

function build(opts = {}) {
  // Require the framework and instantiate it
  const fastify = require("fastify")(opts);

  // Register Swagger
  fastify.register(require("fastify-swagger"), swagger.options);

  fastify.decorate("notFound", (request, reply) => {
    reply.code(404).type("application/json").send({ error: "Not Found" });
  });
  fastify.setNotFoundHandler(fastify.notFound);

  fastify.decorate("validateKey", validateKey);

  fastify.register(require("fastify-auth")).after(routes);

  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(500).send({ error: "Server Error", message: error });
  });

  // function to declare all routes at the end after registration
  function routes() {
    // Declare a route
    fastify.get("/", async (request, reply) => {
      return { hello: "This is the CiCO server" };
    });

    // Configure routes for Devices
    deviceRoutes(fastify).forEach((route, index) => {
      fastify.route(route);
    });

    // Configure routes for Feeds
    feedRoutes(fastify).forEach((route, index) => {
      fastify.route(route);
    });

    // Configure routes for Users
    userRoutes(fastify).forEach((route, index) => {
      fastify.route(route);
    });
  }

  return fastify;
}

module.exports = build;
