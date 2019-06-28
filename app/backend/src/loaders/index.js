const express = require('./express');
const database = require('./database');
const services = require('./services');
const redis = require('./redis');

module.exports = {
  start: async app => {
    await express.start(app);
    await database.start();
    await services.start();
    await redis.start();
  },
  stop: async () => {
    await express.stop();
    await database.stop();
    await services.stop();
    await redis.stop();
  }
};