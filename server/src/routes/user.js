// Import our Controllers
const userController = require("../controllers/userController");

const userProperties = {
  _id: { type: "string" },
  name: { type: "string" },
  lastName: { type: "string" },
  email: { type: "string", format: "email" },
  username: { type: "string" },
  accessToken: { type: "string" },
  tokenCreationDate: { type: "string" },
  tokenHost: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
  devices: { type: "array", items: { type: "string" } },
};

const routes = (fastify) => [
  {
    method: "POST",
    url: "/api/users/:id/generateToken",
    handler: userController.generateKey(fastify),
    schema: {
      description: "Generate an access Token for the selected user",
      tags: ["users"],
      summary: "Returns the new access Token for the selected user",
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
          properties: {
            accessToken: { type: "string" },
          },
        },
        404: {
          description: "User not found",
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
    url: "/api/users/:id",
    handler: userController.getUserById(fastify),
    schema: {
      description: "Get user details",
      tags: ["users"],
      summary: "Returns user details",
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
          properties: userProperties,
        },
        404: {
          description: "User not found.",
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
    url: "/api/users",
    handler: userController.addUser(fastify),
    schema: {
      description: "Create a new user",
      tags: ["users"],
      summary: "Create a new user",
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          username: { type: "string" },
        },
        required: ["name", "lastName", "email", "username"],
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: userProperties,
        },
        400: {
          description: "Bad request.",
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
    url: "/api/users",
    handler: userController.getUsers(fastify),
    schema: {
      description: "Returns the list of users",
      tags: ["users"],
      summary: "Returns the list of users",
      response: {
        200: {
          description: "Successful response",
          type: "array",
          items: {
            type: "object",
            properties: userProperties,
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
    method: "PUT",
    url: "/api/users/:id",
    handler: userController.updateUser(fastify),
    schema: {
      description: "Update selected user",
      tags: ["users"],
      summary: "Update selected user",
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
          properties: userProperties,
        },
        404: {
          description: "User not found.",
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
    url: "/api/users/:id",
    handler: userController.deleteUser(fastify),
    schema: {
      description: "Delete user by ID",
      tags: ["users"],
      summary: "Delete user by ID",
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
          description: "User not found.",
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
    url: "/api/users/:userId/device/:deviceId",
    handler: userController.linkDevice(fastify),
    schema: {
      description: "Add write right to user for a device",
      tags: ["users"],
      summary: "Link a device to a user",
      params: {
        type: "object",
        properties: {
          userId: { type: "string" },
          deviceId: { type: "string" },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: userProperties,
        },
        400: {
          description: "Bad request.",
          type: "object",
          content: {},
        },
        404: {
          description: "User or device not found",
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
    url: "/api/users/:userId/device/:deviceId",
    handler: userController.unlinkDevice(fastify),
    schema: {
      description: "Remove write right to user for a device",
      tags: ["users"],
      summary: "UnLink a device from a user",
      params: {
        type: "object",
        properties: {
          userId: { type: "string" },
          deviceId: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: userProperties,
        },
        400: {
          description: "Bad request.",
          type: "object",
          content: {},
        },
        404: {
          description: "User or device not found",
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
