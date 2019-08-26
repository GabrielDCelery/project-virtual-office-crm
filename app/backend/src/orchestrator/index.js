const Users = require('./Users');
const addresses = require('./addresses');

class Orchestrator {
  constructor() {
    this.services = null;
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.execute = this.execute.bind(this);
  }

  initialize(services) {
    this.instances = {
      users: new Users({
        services
      }),
      addresses: {
        findAll: addresses.findAllWrapper(services)
      }
    };
  }

  async start({
    services
  }) {
    if (this.initialized) {
      throw new Error('Tried to initialize orchestrator twice!');
    }
    this.initialize(services);
    this.initialized = true;
  }

  async stop() {
    this.initialized = false;
  }

  async execute(instanceName, methodName, args) {
    return this.instances[instanceName][methodName](args);
  }
}

module.exports = new Orchestrator();