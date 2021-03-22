const deviceRoutes = require("./routes/device");
const userRoutes = require("./routes/user");

// Import Swagger Options
const swagger = require("./config/swagger");

function build(opts = {}) {
  // Require the framework and instantiate it
  const fastify = require("fastify")(opts);

  // Register Swagger
  fastify.register(require("fastify-swagger"), swagger.options);

  fastify.decorate("notFound", (request, reply) => {
    reply.code(404).type("application/json").send("Not Found");
  });
  fastify.setNotFoundHandler(fastify.notFound);

  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(500).send({ error: "Server Error" });
  });

  // Declare a route
  fastify.get("/", async (request, reply) => {
    return { hello: "This is the CiCO server" };
  });

  // Configure routes for Devices
  deviceRoutes(fastify).forEach((route, index) => {
    fastify.route(route);
  });

  // Configure routes for Devices
  userRoutes(fastify).forEach((route, index) => {
    fastify.route(route);
  });

  return fastify;
}

module.exports = build;
