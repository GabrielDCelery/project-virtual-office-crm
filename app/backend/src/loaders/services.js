const services = globalRequire('services');
const helpers = globalRequire('helpers');

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
  SERVICE_JWT_EXPIRY
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
      helpers: helpers
    });
    await services.get('redis').start({
      environmentVariables: {
        SERVICE_REDIS_HOST,
        SERVICE_REDIS_PORT
      },
      helpers: helpers
    });
    await services.get('jwt').start({
      environmentVariables: {
        SERVICE_JWT_SECRET,
        SERVICE_JWT_EXPIRY
      },
      helpers: helpers
    })
  },
  stop: async () => {
    await services.get('database').stop();
    await services.get('redis').stop();
  }
};