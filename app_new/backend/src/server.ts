import * as express from 'express';
import loaders from './loaders';
import config from './config';

interface IServer {
  start(callback: Function): Promise<void>;
  stop(callback: Function): Promise<void>;
}

class Server implements IServer {
  private app: express.Application;
  private server: any;

  constructor() {
    this.app = null;
  }

  async start(callback = () => {}) {
    try {
      this.app = express();

      await loaders.start(this.app);

      this.server = this.app.listen(config.host.port, error => {
        if (error) {
          return process.exit(1);
        }

        return callback();
      });
    } catch (error) {
      return process.exit(1);
    }
  }

  async stop(callback = () => {}) {
    try {
      await loaders.stop();
      await this.server.close();
      callback();
    } catch (error) {
      return process.exit(1);
    }
  }
}

export default new Server();
