"use strict";

// This file contains code that we reuse
// between our tests.

const Fastify = require("fastify");
const fp = require("fastify-plugin");
const App = require("./app");
const { beforeEach, tearDown, test } = require("tap");

const url = "mongodb://localhost/test";
const mongoose = require("mongoose");

function clearCollections() {
  for (let collection in mongoose.connection.collections) {
    mongoose.connection.collections[collection].deleteMany({});
  }
}

let client;

beforeEach(async function () {
  // if connection is down then open it
  if (!client || client.readyState === 0) {
    await mongoose.connect(url);
    client = mongoose.connection;
  }
//   clearCollections();
});

tearDown(async function () {
  if (client.readyState) {
    clearCollections();
    await client.close();
    client = null;
  }
});

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {
    auth: {
      secret: "averyverylongsecret",
    },
    mongodb: {
      client,
    },
  };
}

// automatically build and tear down our instance
function build(t) {
    const app = App({
      logger: {
        level: "info",
        prettyPrint: true,
      },
    });


  // tear down our app after we are done
  t.tearDown(app.close.bind(app));

  return app;
}

module.exports = {
  config,
  build,
};
