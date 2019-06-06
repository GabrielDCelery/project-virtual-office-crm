const server = require('../../src/server');

beforeAll(async done => {
  await server.start(done);
});

afterAll(async done => {
  await server.stop(done);
});