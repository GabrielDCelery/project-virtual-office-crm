const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const api = globalRequire('api');
const config = globalRequire('config');

module.exports = {
  start: async ({ app, middlewares, orchestrator, Router }) => {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    const {
      addresses,
      cities,
      countries,
      legalEntities,
      mails,
      mailSenders,
      mailSenderNames,
      mailSubjects,
      users
    } = api.router;

    app.use(
      config.api.routerPathPrefix.addresses,
      addresses({ Router, orchestrator })
    );
    app.use(
      config.api.routerPathPrefix.cities,
      cities({ Router, orchestrator })
    );
    app.use(
      config.api.routerPathPrefix.countries,
      countries({ Router, orchestrator })
    );
    app.use(
      config.api.routerPathPrefix.legalEntities,
      legalEntities({ Router, orchestrator })
    );
    app.use(
      config.api.routerPathPrefix.mails,
      mails({ Router, middlewares, orchestrator })
    );
    app.use(
      config.api.routerPathPrefix.mailSenders,
      mailSenders({ Router, orchestrator })
    );
    app.use(
      config.api.routerPathPrefix.mailSenderNames,
      mailSenderNames({ Router, orchestrator })
    );
    app.use(
      config.api.routerPathPrefix.mailSubjects,
      mailSubjects({ Router, orchestrator })
    );
    app.use(config.api.routerPathPrefix.users, users({ Router, orchestrator }));

    // Path for performing health check on the service
    app.get('/health', (req, res) => {
      res.status(200);
      res.send('OK');
    });
  },
  stop: async () => {}
};
