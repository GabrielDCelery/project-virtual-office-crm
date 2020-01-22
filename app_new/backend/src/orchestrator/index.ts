import { OrchestratorMethod as OrchestratorMethodEnums } from '../common/enums';
import { Services } from '../services';
const { ORCHESTRATOR_METHOD_FIND_ALL_ADDRESSES } = OrchestratorMethodEnums;

export interface IOrchestrator {}

export class Orchestrator implements IOrchestrator {
  private initialized: boolean;
  private methods: {
    [ORCHESTRATOR_METHOD_FIND_ALL_ADDRESSES]: Function;
  };

  constructor() {
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.execute = this.execute.bind(this);
  }

  initialize(services: Services) {
    this.methods = {
      [ORCHESTRATOR_METHOD_FIND_ALL_ADDRESSES]: () => {}
    };
  }

  async start(services: Services) {
    if (this.initialized) {
      throw new Error('Tried to initialize orchestrator twice!');
    }
    this.initialize(services);
    this.initialized = true;

    return this;
  }

  async stop() {
    this.initialized = false;
  }

  async execute(orchestratorName: OrchestratorMethodEnums, argsObj?: object) {
    return this.methods[orchestratorName](argsObj);
  }
}

export default new Orchestrator();
