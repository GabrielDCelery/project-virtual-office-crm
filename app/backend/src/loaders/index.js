const express = require('./express');
const services = require('./services');
const orchestrator = require('./orchestrator');

module.exports = {
  start: async app => {
    await express.start(app);
    await services.start();
    await orchestrator.start();
  },
  stop: async () => {
    await express.stop();
    await services.stop();
    await orchestrator.stop();
  }
};