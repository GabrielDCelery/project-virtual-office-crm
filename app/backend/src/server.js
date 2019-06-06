global.globalRequire = path => {
  return require(`${__dirname}/${path}`);
};

const express = require('express');
const loaders = require('./loaders');
const config = require('./config');

let server = null;

const start = async (callback = () => { }) => {
  try {
    const app = express();

    await loaders.start(app);

    server = app.listen(config.host.port, error => {
      if (error) {
        return process.exit(1);
      }

      callback();

      console.log(`Running app on PORT:${config.host.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

const stop = async (callback = () => { }) => {
  try {
    await loaders.stop();
    await server.close();
    callback();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  start: start,
  stop: stop
};
