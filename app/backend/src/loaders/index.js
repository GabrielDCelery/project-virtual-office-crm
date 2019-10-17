const api = require('./api');
const services = require('./services');
const middlewares = require('./middlewares');
const orchestrator = require('./orchestrator');

module.exports = {
  start: async ({ app, Router }) => {
    await services.start();
    await middlewares.start();
    await orchestrator.start();
    await api.start({
      Router,
      app,
      middlewares: globalRequire('middlewares'),
      orchestrator: globalRequire('orchestrator')
    });
  },
  stop: async () => {
    await api.stop();
    await orchestrator.stop();
    await services.stop();
  }
};
