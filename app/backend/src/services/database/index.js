const Knex = require('knex');
const {
  Model,
  transaction
} = require('objection');
const controllers = require('./controllers');
const models = require('./models');
const config = require('./config');
const {
  DB_SERVICE_NAME,
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
    nodeModules
  }) {
    const {
      Addresses,
      Documents,
      LegalEntities,
      Users
    } = controllers;

    this.controllers = {
      addresses: new Addresses({
        models,
        nodeModules
      }),
      documents: new Documents({
        models,
        nodeModules
      }),
      legalEntities: new LegalEntities({
        models,
        nodeModules
      }),
      users: new Users({
        models,
        nodeModules
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

  async execute(controller, method, args = {}) {
    const {
      ResultWrapper
    } = this.helpers;

    const trx = args["transaction"] ? args["transaction"] : await transaction.start(Model.knex());

    try {
      const result = await this.controllers[controller][method]({
        ...args,
        transaction: trx
      });

      await trx.commit();

      return new ResultWrapper().wrap({
        type: ResultWrapper.TYPE.SUCCESS,
        service: DB_SERVICE_NAME,
        payload: result
      });
    } catch (error) {
      await trx.rollback();

      if (error.name !== DB_ERROR_NAME_CONTROLLER_ERROR) {
        throw error;
      }

      return new ResultWrapper().wrap({
        type: ResultWrapper.TYPE.FAIL,
        service: DB_SERVICE_NAME,
        errors: [error]
      });
    }
  }
}

module.exports = new DB();