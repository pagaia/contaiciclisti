// Import our Controllers
const deviceController = require("../controllers/deviceController");

const routes = (fastify) => [
  {
    method: "GET",
    url: "/api/devices",
    handler: deviceController.getDevices(fastify),
  },
  {
    method: "GET",
    url: "/api/devices/:id",
    handler: deviceController.getDeviceById(fastify),
  },
  {
    method: "POST",
    url: "/api/devices",
    handler: deviceController.addDevice(fastify),
  },
  {
    method: "PUT",
    url: "/api/devices/:id",
    handler: deviceController.updateDevice(fastify),
  },
  {
    method: "DELETE",
    url: "/api/devices/:id",
    handler: deviceController.deleteDevice(fastify),
  },
  // feeds
  {
    method: "POST",
    url: "/api/devices/:id/feeds",
    handler: deviceController.addFeed(fastify),
  },
  {
    method: "GET",
    url: "/api/devices/:id/feeds",
    handler: deviceController.getFeedsByDeviceId(fastify),
  },
];

module.exports = routes;
