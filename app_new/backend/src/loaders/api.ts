import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { Addresses as AddressesRouter } from '../api/routes';

interface IAPILoader {
  start(app: express.Application): Promise<void>;
  stop(): Promise<void>;
}

class APILoader implements IAPILoader {
  async start(app: express.Application) {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    app.use('/api/addresses', new AddressesRouter().createRoutes().getRouter());
  }

  async stop() {}
}

export default new APILoader();
