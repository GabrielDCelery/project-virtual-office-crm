const services = globalRequire('services');

module.exports = {
  start: async () => {
    await services.start();
  },
  stop: async () => {
    await services.stop();
  }
};