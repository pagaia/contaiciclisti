// Import our Controllers
const feedController = require("../controllers/feedController");

const deviceProperties = {
  _id: { type: "string" },
  name: { type: "string" },
  location: {
    type: "object",
    properties: {
      coordinates: {
        type: "array",
        items: { type: "number" },
      },
    },
  },
  description: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const feedProperties = {
  _id: { type: "string" },
  hourly: { type: "number" },
  hourlyDay: { type: "number" },
  daily: { type: "number" },
  battery: { type: "number" },
  gmsErrorNumber: { type: "number" },
  htmlErrorNumber: { type: "number" },
  sendErrorNumber: { type: "number" },
  yesterday: { type: "number" },
  device: {
    type: "object",
    properties: deviceProperties,
  },

  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const routes = (fastify) => [
  // feeds
  {
    method: "POST",
    url: "/api/devices/:id/feeds",
    preHandler: fastify.auth([fastify.validateKey]),
    handler: feedController.addFeed(fastify),
    schema: {
      description: "Add feed to device",
      tags: ["feeds"],
      summary: "Add new feed to device",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "id of the device" },
        },
      },
      headers: {
        type: "object",
        properties: {
          "x-api-token": {
            type: "string",
            description: "mandatory api token",
          },
          "x-api-user": {
            type: "string",
            description: "mandatory api user",
          },
        },
        required: ["x-api-token", "x-api-user"],
      },
      body: {
        type: "object",
        properties: feedProperties,
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: feedProperties,
        },
        400: {
          description: "Malformed object",
          type: "object",
          content: {
            error: { type: "string" },
          },
        },
        401: {
          description: "Not authorised",
          type: "object",
          content: {
            error: { type: "string" },
          },
        },
        404: {
          description: "Device ID not found",
          type: "object",
          content: {},
        },
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
  {
    method: "POST",
    url: "/api/devices/:id/feeds/multi",
    handler: feedController.addMultiFeeds(fastify),
    schema: {
      description: "Add multi feed to device",
      tags: ["feeds"],
      summary: "Add multiple feed to a device",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "id of the device" },
        },
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: feedProperties,
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "array",
          items: {
            type: "object",
            properties: feedProperties,
          },
        },
        400: {
          description: "Malformed object",
          type: "object",
          content: {
            error: { type: "string" },
          },
        },
        404: {
          description: "Device ID not found",
          type: "object",
          content: {},
        },
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
  {
    method: "GET",
    url: "/api/devices/:id/feeds",
    handler: feedController.searchFeeds(fastify),
    schema: {
      description: "Get list of feeds per device",
      tags: ["feeds"],
      summary: "Get list of feeds per device",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "id of the device" },
        },
      },
      querystring: {
        start: { type: "string" },
        end: { type: "string" },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            ...deviceProperties,
            feeds: {
              type: "array",
              items: {
                type: "object",
                properties: feedProperties,
              },
            },
          },
        },
        404: {
          description: "Device ID not found",
          type: "object",
          content: {},
        },
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
];

module.exports = routes;
