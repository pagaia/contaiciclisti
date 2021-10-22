// Import our Controllers
const feedController = require("../controllers/feedController");

const deviceProperties = {
  _id: { type: "string" },
  name: { type: "string" },
  channelId: { type: "number" },
  location: {
    type: "object",
    properties: {
      coordinates: {
        type: "array",
        items: { type: "number" },
      },
    },
  },
  newColor: { type: "string" },
  active: { type: "boolean" },
  description: { type: "string" },
  created_at: { type: "string" },
  updated_at: { type: "string" },
};

const feedProperties = {
  _id: { type: "string" },
  field1: { type: "number", nullable: true },
  field2: { type: "number", nullable: true },
  field3: { type: "number", nullable: true },
  field4: { type: "number", nullable: true },
  field5: { type: "number", nullable: true },
  field6: { type: "number", nullable: true },
  field7: { type: "number", nullable: true },
  field18: { type: "number", nullable: true },
  entry_id: { type: "number" },
  device: {
    type: "object",
    properties: deviceProperties,
  },

  created_at: { type: "string" },
  updated_at: { type: "string" },
};

const routes = (fastify) => {
  return [
    // add feed
    {
      method: "POST",
      url: "/api/devices/:id/feeds",
      // disable preHandler causing multiple reauests
      // preHandler: fastify.auth([fastify.validateToken]),
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
      // preHandler: fastify.auth([fastify.validateToken]),
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
          timezone: { type: "string" },
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
    {
      method: "DELETE",
      url: "/api/devices/:id/feeds",
      // preHandler: fastify.auth([fastify.validateToken]),
      handler: feedController.deleteFeedsByDeviceID(fastify),
      schema: {
        description: "Delete all feeds per device",
        tags: ["feeds"],
        summary: "Delete all feeds per device",
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "id of the device" },
          },
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
    {
      method: "GET",
      url: "/api/devices/:id/feedsOnly",
      handler: feedController.searchFeedsOnly(fastify),
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
          timezone: { type: "string" },
        },
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: feedProperties,
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
      url: "/api/devices/:id/feeds.csv",
      handler: feedController.searchFeedsCsv(fastify),
      schema: {
        description: "Get list of feeds per device in CSV format",
        tags: ["feeds"],
        summary: "Get list of feeds per device in CSV format",
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "id of the device" },
          },
        },
        querystring: {
          start: { type: "string" },
          end: { type: "string" },
          timezone: { type: "string" },
        },
        response: {
          200: {
            description: "Successful response",
            type: "string",
            content: {
              "text/csv": {},
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
};

module.exports = routes;
