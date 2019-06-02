const express = require('./express');

module.exports = {
  start: async app => {
    await express.start(app);
  },
  stop: async () => {
    await express.stop();
  }
};