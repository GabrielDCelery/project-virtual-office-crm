const Knex = require('knex');
const {
  Model,
  transaction
} = require('objection');
const controllers = require('./controllers');
const models = require('./models');
const config = require('./config');
const {
  DB_ERROR_NAME_CONTROLLER_ERROR
} = require("./constants");

class DB {
  constructor() {
    this.knex = null;
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getKnex = this.getKnex.bind(this);
    this.execute = this.execute.bind(this);
  }

  initialize({
    nodeModules: {
      verror
    }
  }) {
    const {
      Users,
      Addresses,
      AddressCities,
      AddressCountries
    } = controllers;

    this.controllers = {
      users: new Users({
        models,
        nodeModules: {
          verror
        }
      }),
      addresses: new Addresses({
        models
      }),
      addressCities: new AddressCities({
        models
      }),
      addressCountries: new AddressCountries({
        models
      })
    }
  }

  async start({
    environmentVariables,
    nodeModules,
    helpers
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
    this.initialize({
      nodeModules
    });
    this.helpers = helpers;
    this.initialized = true;
  }

  async stop() {
    this.knex.destroy();
    this.initialized = false;
  }

  getKnex() {
    return this.knex;
  }

  async execute(controller, method, args) {
    return transaction(Model.knex(), async transaction => {
      try {
        const result = await this.controllers[controller][method]({
          ...args,
          transaction
        });

        return this.helpers.wrapResult({
          type: "success",
          service: "database",
          payload: result
        });
      } catch (error) {
        if (error.name !== DB_ERROR_NAME_CONTROLLER_ERROR) {
          throw error;
        }

        return this.helpers.wrapResult({
          type: "fail",
          service: "database",
          errors: [error]
        });
      }
    });
  }
}

module.exports = new DB();