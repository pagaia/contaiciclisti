exports.options = {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "CiCO - ContaiCiclisti Ostinati",
      description:
        "Building a Cyclists counter REST API with Node.js, MongoDB, Fastify and Swagger",
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://github.com/pagaia/contaiciclisti",
      description: "Find more info here",
    },
    host: "localhost:8080",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    definitions: {
      User: {
        type: "object",
        required: ["name", "lastName", "email", "username"],
        properties: {
          name: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
          username: { type: "string" },
          accessToken: { type: "string" },
          tokenCreationDate: { type: "string", format: "date-time" },
          tokenHost: { type: "string" },
          devices: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
      Device: {
        type: "object",
        // required: ["id", "email", "name"],
        properties: {
          name: { type: "string" },
          location: { type: "string", enum: ["Point"] },
          coordinates: { type: "integer", format: "int64" },
        },
        feeds: {
          type: "array",
          items: {
            type: "string",
          },
        },
        description: { type: "string" },
      },
      Feed: {
        type: "object",
        properties: {
          hourly: { type: "number" },
          hourlyDay: { type: "number" },
          daily: { type: "number" },
          battery: { type: "number" },
          gmsErrorNumber: { type: "number" },
          htmlErrorNumber: { type: "number" },
          sendErrorNumber: { type: "number" },
          yesterday: { type: "number" },
          device: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
        },
      },
      ApiResponse: {
        type: "object",
        properties: {
          code: { type: "integer", format: "int32" },
          type: { type: "string" },
          message: { type: "string" },
        },
      },
    },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: true,
  },
  exposeRoute: true,
};
