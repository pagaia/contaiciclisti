"use strict";

const { test } = require("tap");
const { build, config } = require("./prepareTest");

test('requests the "/" route', async (t) => {
  const app = build(t);

  // close fastify after each test
  t.tearDown(() => app.close());

  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  t.strictEqual(response.statusCode, 200);
  t.strictEqual(
    response.headers["content-type"],
    "application/json; charset=utf-8"
  );
  t.deepEqual(response.json(), { hello: "This is the CiCO server" });
});

test('requests the "/api/devices" route', async (t) => {
  const app = build(t);

  const conf = config();
  // close fastify after each test
  t.tearDown(() => app.close());

  const response = await app.inject({
    method: "GET",
    url: "/api/devices",
  });

  t.strictEqual(response.statusCode, 200);
  t.strictEqual(
    response.headers["content-type"],
    "application/json; charset=utf-8"
  );
  t.deepEqual(response.json(), []);
});

test('inserting and find a device the "/api/devices" route', async (t) => {
  const app = build(t);

  const conf = config();
  // close fastify after each test
  t.tearDown(() => app.close());

  const payload = {
    name: "Nomentana",
    location: {
      coordinates: [40, 5],
      type: "Point",
    },
    description: "This is my description",
  };
  const insert = await app.inject({
    method: "POST",
    url: "/api/devices",
    payload,
  });

  insert.json()._id
  const response = await app.inject({
    method: "GET",
    url: `/api/devices/${insert.json()._id}`,
  });

  
  t.equal(response.statusCode, 200, "should return 201");
  t.equal(
    response.headers["content-type"],
    "application/json; charset=utf-8",
    "should accept application/json"
  );
  const json = response.json();
  console.log({ json });
  t.equal(json.name, payload.name, "Same name");
  t.same(
    json.location.coordinates,
    payload.location.coordinates,
    "same coordinates"
  );
});
