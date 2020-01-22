import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import config from '../config';
import { Addresses as AddressesRouter } from '../api/routes';
import { Orchestrator } from '../orchestrator';

interface IAPILoader {
  start(app: express.Application, orchestrator: Orchestrator): Promise<void>;
  stop(): Promise<void>;
}

class APILoader implements IAPILoader {
  async start(app: express.Application, orchestrator: Orchestrator) {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    app.use(
      config.get('api.routerPathPrefix.addresses'),
      new AddressesRouter().createRouter(orchestrator)
    );
  }

  async stop() {}
}

export default new APILoader();
