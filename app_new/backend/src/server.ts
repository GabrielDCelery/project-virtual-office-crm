import * as express from 'express';
import loaders from './loaders';
import config from './config';

class Server {
  private server: express.Application;

  constructor() {
    this.server = null;
  }

  async start(callback = () => {}) {
    try {
      const app = await loaders.start();

      this.server = app.listen(config.host.port, error => {
        if (error) {
          return process.exit(1);
        }

        return callback();
      });
    } catch (error) {
      console.log(error);
      return process.exit(1);
    }
  }

  async stop(callback = () => {}) {
    try {
      await loaders.stop();
      await this.server.close();
      callback();
    } catch (error) {
      console.log(error);
      return process.exit(1);
    }
  }
}

export default new Server();
