import * as express from 'express';
import api from './api';

interface ILoaders {
  start(app: express.Application): Promise<void>;
  stop(): Promise<void>;
}

class Loaders implements ILoaders {
  async start(app: express.Application) {
    await api.start(app);
  }

  async stop() {}
}

export default new Loaders();
