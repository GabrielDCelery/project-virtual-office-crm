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

  initialize(helpers) {
    const {
      Users,
      Addresses,
      AddressCities,
      AddressCountries
    } = controllers;

    this.controllers = {
      users: new Users({
        models,
        helpers
      }),
      addresses: new Addresses({
        models,
        helpers
      }),
      addressCities: new AddressCities({
        models,
        helpers
      }),
      addressCountries: new AddressCountries({
        models,
        helpers
      })
    }
  }

  async start({
    environmentVariables,
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
    this.initialize(helpers);
    this.initialized = true;
  }

  async stop() {
    this.knex.destroy();
    this.initialized = false;
  }

  getKnex() {
    return this.knex;
  }

  async execute({
    controller,
    method,
    data
  }) {
    return transaction(Model.knex(), async transaction => {
      return this.controllers[controller][method]({
        data,
        transaction
      });
    });
  }
}

module.exports = new DB();