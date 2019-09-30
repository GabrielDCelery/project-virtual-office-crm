const services = globalRequire('services');
const helpers = globalRequire('helpers');
const jsonwebtoken = require('jsonwebtoken');
const lodash = require('lodash');
const verror = require('verror');

const {
  NODE_ENV,
  SERVICE_DB_CLIENT,
  SERVICE_DB_USER,
  SERVICE_DB_HOST,
  SERVICE_DB_PASSWORD,
  SERVICE_DB_DATABASE,
  SERVICE_DB_CHARSET,
  SERVICE_DB_PORT,
  SERVICE_REDIS_HOST,
  SERVICE_REDIS_PORT,
  SERVICE_JWT_SECRET,
  SERVICE_JWT_EXPIRY_IN_SECONDS
} = process.env;

module.exports = {
  start: async () => {
    await services.get('database').start({
      environmentVariables: {
        NODE_ENV,
        SERVICE_DB_CLIENT,
        SERVICE_DB_USER,
        SERVICE_DB_HOST,
        SERVICE_DB_PASSWORD,
        SERVICE_DB_DATABASE,
        SERVICE_DB_CHARSET,
        SERVICE_DB_PORT
      },
      nodeModules: {
        lodash,
        verror
      },
      helpers: helpers
    });
    await services.get('redis').start({
      environmentVariables: {
        SERVICE_REDIS_HOST,
        SERVICE_REDIS_PORT
      },
      helpers: helpers
    });
    await services.get('authentication').start({
      environmentVariables: {
        SERVICE_JWT_SECRET,
        SERVICE_JWT_EXPIRY_IN_SECONDS
      },
      helpers: helpers,
      nodeModules: {
        jsonwebtoken,
        verror
      }
    });
  },
  stop: async () => {
    await services.get('database').stop();
    await services.get('redis').stop();
  }
};
