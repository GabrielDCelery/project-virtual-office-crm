import * as express from 'express';
import apiLoader from './api';
import orchestratorLoader from './orchestrator';
import servicesLoader from './services';

interface ILoaders {
  start(): Promise<express.Application>;
  stop(): Promise<void>;
}

class Loaders implements ILoaders {
  async start() {
    const services = await servicesLoader.start();
    const orchestrator = await orchestratorLoader.start(services);
    const app = express();
    await apiLoader.start(app, orchestrator);

    return app;
  }

  async stop() {}
}

export default new Loaders();
