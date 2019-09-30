const Users = require('./Users');
const addresses = require('./addresses');
const cities = require('./cities');
const countries = require('./countries');
const legalEntities = require('./legalEntities');
const mailSenderNames = require('./mailSenderNames');
const mailSenders = require('./mailSenders');
const mailSubjects = require('./mailSubjects');
const users = require('./users');

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
      addresses: {
        findAll: addresses.findAllWrapper(services)
      },
      cities: {
        findAll: cities.findAllWrapper(services)
      },
      countries: {
        findAll: countries.findAllWrapper(services)
      },
      legalEntities: {
        update: legalEntities.updateWrapper(services),
        getAllVersionsOfAllEntities: legalEntities.getAllVersionsOfAllEntitiesWrapper(
          services
        )
      },
      mailSenders: {
        findAll: mailSenders.findAllWrapper(services)
      },
      mailSenderNames: {
        create: mailSenderNames.createWrapper(services),
        findAll: mailSenderNames.findAllWrapper(services)
      },
      mailSubjects: {
        create: mailSubjects.createWrapper(services),
        findAll: mailSubjects.findAllWrapper(services)
      },
      users: {
        login: users.loginWrapper(services)
      }
    };
  }

  async start({ services }) {
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
