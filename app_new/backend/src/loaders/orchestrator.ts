import orchestrator, { Orchestrator } from '../orchestrator';
import { Services } from '../services';

interface IOrchestratorLoader {
  start(services: Services): Promise<Orchestrator>;
  stop(): Promise<void>;
}

class OrchestratorLoader implements IOrchestratorLoader {
  async start(services: Services) {
    return await orchestrator.start(services);
  }

  async stop() {}
}

export default new OrchestratorLoader();
