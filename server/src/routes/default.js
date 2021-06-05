const defaultController = require("../controllers/defaultController");

const routes = (fastify) => [
  {
    method: "GET",
    url: "/api/temporaryToken",
    handler: defaultController.generateJWT(fastify),
    schema: {
      description: "Get temporary token to bypass OAuth",
      tags: ["default"],
      summary: "Get temporary token",
      response: {
        200: {
          description: "Successful token created",
          type: "object",
          properties: {
            token: { type: "string" },
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
