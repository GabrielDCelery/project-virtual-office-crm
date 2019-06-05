const express = require('./express');
const database = require('./database');

module.exports = {
  start: async app => {
    await express.start(app);
    await database.start();
  },
  stop: async () => {
    await express.stop();
    await database.stop();
  }
};