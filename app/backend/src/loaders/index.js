const express = require('./express');
const database = require('./database');
const services = require('./services');

module.exports = {
  start: async app => {
    await express.start(app);
    await database.start();
    await services.start();
  },
  stop: async () => {
    await express.stop();
    await database.stop();
    await services.stop();
  }
};