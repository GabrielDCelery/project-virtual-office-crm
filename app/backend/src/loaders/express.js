const bodyParser = require('body-parser');
const cors = require('cors');
const api = globalRequire('api');
const config = globalRequire('config');

module.exports = {
  start: async app => {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(config.api.routerPathPrefix.users, api.router.users);
    app.use(config.api.routerPathPrefix.addresses, api.router.addresses);

    // Path for performing health check on the service
    app.get('/health', (req, res) => {
      res.status(200);
      res.send('OK');
    });
  },
  stop: async () => { }
};
