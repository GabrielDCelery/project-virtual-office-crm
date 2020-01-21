import * as express from 'express';
import api from './api';

interface ILoaders {
  start(): Promise<express.Express>;
  stop(): Promise<void>;
}

class Loaders implements ILoaders {
  constructor() {}

  async start() {
    const app = await api.start();

    return app;
  }

  async stop() {}
}

export default new Loaders();
