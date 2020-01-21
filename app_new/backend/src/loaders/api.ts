import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

interface IAPILoader {
  start(): Promise<express.Express>;
  stop(): Promise<void>;
}

class APILoader implements IAPILoader {
  async start() {
    const app = express();

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    return app;
  }

  async stop() {}
}

export default new APILoader();
