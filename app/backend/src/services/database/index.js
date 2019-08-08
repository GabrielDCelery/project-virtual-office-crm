const Knex = require('knex');
const {
  Model,
  transaction
} = require('objection');
const controllers = require('./controllers');
const models = require('./models');
const config = require('./config');

class DB {
  constructor() {
    this.knex = null;
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getKnex = this.getKnex.bind(this);
    this.execute = this.execute.bind(this);
  }

  initialize(scripts) {
    const {
      Users,
      Addresses,
      AddressCities,
      AddressCountries
    } = controllers;

    this.instances = {
      users: new Users({
        models,
        scripts
      }),
      addresses: new Addresses({
        models,
        scripts
      }),
      addressCities: new AddressCities({
        models,
        scripts
      }),
      addressCountries: new AddressCountries({
        models,
        scripts
      })
    }
  }

  async start({
    environmentVariables,
    scripts
  }) {
    if (this.initialized) {
      throw new Error('Tried to initialize the database twice!');
    }

    const initializedConfig = config(environmentVariables);
    const {
      NODE_ENV
    } = environmentVariables;
    this.knex = Knex(initializedConfig['connection'][NODE_ENV]);
    Model.knex(this.knex);
    this.initialize(scripts);
    this.initialized = true;
  }

  async stop() {
    this.knex.destroy();
    this.initialized = false;
  }

  getKnex() {
    return this.knex;
  }

  async execute(controllerName, methodName, {
    data,
    config
  }) {
    return transaction(Model.knex(), async transaction => {
      return this.instances[controllerName][methodName]({
        data,
        config: {
          ...config,
          transaction
        }
      });
    });
  }
}

module.exports = new DB();