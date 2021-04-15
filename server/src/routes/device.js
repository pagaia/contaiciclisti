// Import our Controllers
const deviceController = require("../controllers/deviceController");

const deviceProperties = {
  _id: { type: "string" },
  name: { type: "string" },
  location: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["Point"] },
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

const routes = (fastify) => [
  {
    method: "GET",
    url: "/api/devices",
    handler: deviceController.getDevices(fastify),
    schema: {
      description: "Get list of devices",
      tags: ["devices"],
      summary: "Returns list of devices",
      response: {
        200: {
          description: "Successful response",
          type: "array",
          items: {
            type: "object",
            properties: deviceProperties,
          },
        },
        400: {
          description: "Invalid tag value",
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
    url: "/api/devices/:id",
    handler: deviceController.getDeviceById(fastify),
    schema: {
      description: "Get device details",
      tags: ["devices"],
      summary: "Returns device details",
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: deviceProperties,
        },
        404: {
          description: "A device with the specified ID was not found.",
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
    url: "/api/devices",
    handler: deviceController.addDevice(fastify),
    schema: {
      description: "Create a new device",
      tags: ["devices"],
      summary: "Add a new device to the list",
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          location: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["Point"] },
              coordinates: {
                type: "array",
                items: { type: "number" },
              },
            },
          },
          description: { type: "string" },
          createdAt: { type: "string" },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: deviceProperties,
        },
        409: {
          description: "A device with the same name already exists.",
          type: "object",
          content: {},
        },
        default: {
          description: "Unexpected error",
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
    method: "PUT",
    url: "/api/devices/:id",
    handler: deviceController.updateDevice(fastify),
    schema: {
      description: "Update existing device",
      tags: ["devices"],
      summary: "Update an existing device to the list",
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      body: {
        type: "object",
        properties: {
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
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: deviceProperties,
        },
        404: {
          description: "A device with the specified ID was not found.",
          type: "object",
          content: {},
        },
        409: {
          description: "Duplicate Object.",
          type: "object",
          properties: {
            error: { type: "string" },
          },
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
    url: "/api/devices/:id",
    handler: deviceController.deleteDevice(fastify),
    schema: {
      description: "Delete existing device",
      tags: ["devices"],
      summary: "Delete an existing device from the list",
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          content: {},
        },
        404: {
          description: "A device with the specified ID was not found.",
          type: "object",
          properties: {
            error: { type: "string" },
          },
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
