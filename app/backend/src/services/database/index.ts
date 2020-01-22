const config = require('./config');
const {
  DB_SERVICE_NAME,
  DB_ERROR_NAME_CONTROLLER_ERROR
} = require('./constants');
import * as Knex from 'knex';
import * as objection from 'objection';
import { Model, transaction } from 'objection';
import models from './models';
import { Addresses as AddressesController } from './controllers';
import { EDatabaseController } from '../../common/enums';
import { TEnvDatabaseService } from '../../common/types';
const { DB_CONTROLLER_ADDRESSES } = EDatabaseController;

interface IDatabase {
  start(environmentVariables: TEnvDatabaseService): Promise<void>;
}

export class Database implements IDatabase {
  private knex: Knex;
  private initialized: boolean;
  private controllers: {
    [DB_CONTROLLER_ADDRESSES]: any;
  };

  constructor() {
    this.knex = null;
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getKnex = this.getKnex.bind(this);
    this.execute = this.execute.bind(this);
  }

  initialize() {
    this.controllers = {
      [DB_CONTROLLER_ADDRESSES]: new AddressesController(models)
    };
  }

  async start(environmentVariables: TEnvDatabaseService) {
    if (this.initialized) {
      throw new Error('Tried to initialize the database twice!');
    }

    const initializedConfig = config(environmentVariables);
    const { NODE_ENV } = environmentVariables;
    this.knex = Knex(initializedConfig['connection'][NODE_ENV]);
    Model.knex(this.knex);
    this.initialize();
    this.initialized = true;
  }

  async stop() {
    this.knex.destroy();
    this.initialized = false;
  }

  getKnex() {
    return this.knex;
  }

  async createTransaction() {
    return await transaction.start(Model.knex());
  }

  async commitTransaction(transaction) {
    return await transaction.commit();
  }

  async rollbackTransaction(transaction) {
    return await transaction.rollback();
  }

  async execute(controller: EDatabaseController, method: string, args = {}) {
    const { ServiceResultWrapper } = this.helpers;

    const trx = args['transaction']
      ? args['transaction']
      : await transaction.start(Model.knex());

    try {
      const result = await this.controllers[controller][method]({
        ...args,
        transaction: trx
      });

      const returnObj = {
        type: ServiceResultWrapper.TYPE.SUCCESS,
        service: DB_SERVICE_NAME,
        payload: result
      };

      if (!args['bKeepTransactionAlive']) {
        await trx.commit();
      }

      return new ServiceResultWrapper().wrap(returnObj);
    } catch (error) {
      await trx.rollback();

      if (error.name !== DB_ERROR_NAME_CONTROLLER_ERROR) {
        throw error;
      }

      return new ServiceResultWrapper().wrap({
        type: ServiceResultWrapper.TYPE.FAIL,
        service: DB_SERVICE_NAME,
        errors: [error]
      });
    }
  }
}

export default new Database();
