const routes = require("./routes");
// Import Swagger Options
const swagger = require("./config/swagger");

function build(opts = {}) {
  // Require the framework and instantiate it
  const fastify = require("fastify")(opts);

  // Register Swagger
  fastify.register(require("fastify-swagger"), swagger.options);

  // Declare a route
  fastify.get("/", async (request, reply) => {
    return { hello: "This is the CiCO server" };
  });

  routes.forEach((route, index) => {
    fastify.route(route);
  });

  return fastify;
}

module.exports = build;
