import * as express from 'express';
import loaders from './loaders';
import config from './config';

interface IServer {
  start(callback: Function): Promise<void>;
  stop(callback: Function): Promise<void>;
}

class Server implements IServer {
  private server: any;

  constructor() {
    this.server = null;
  }

  async start(callback = () => {}) {
    try {
      const app = await loaders.start();

      this.server = app.listen(config.get('host.port'), (error: Error) => {
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
