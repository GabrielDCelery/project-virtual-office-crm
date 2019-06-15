const proxy = require('http-proxy-middleware');

module.exports = app => {
  const {
    BACKEND_HOST,
    BACKEND_PORT
  } = process.env;

  const proxyToConfig = { target: `http://${BACKEND_HOST}:${BACKEND_PORT}` };

  app.use(proxy('/api/*', proxyToConfig));
  app.use(proxy('/api/*/*', proxyToConfig));
};
