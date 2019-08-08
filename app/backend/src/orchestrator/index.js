const Users = require('./Users');

class Orchestrator {
  constructor() {
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.execute = this.execute.bind(this);
  }

  initialize(services) {
    this.instances = {
      users: new Users({
        services
      })
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

  async execute(instance_name, method_name, {
    data,
    config
  }) {
    return this.instances[instance_name][method_name]({
      data,
      config
    });
  }
}

module.exports = new Orchestrator();