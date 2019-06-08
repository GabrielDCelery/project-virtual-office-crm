const Knex = require('knex');
const { Model, transaction } = require('objection');
const { Container } = require('typedi');
const { ResultWrapper } = require('../helpers');
const { DB_CONTROLLERS_NAMESPACE } = require('./constants');
const controllers = require('./controllers');

class DB {
  constructor() {
    this.knex = null;
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getKnex = this.getKnex.bind(this);
    this.executeDBAction = this.executeDBAction.bind(this);
  }

  _initControllers() {
    const { Users } = controllers;

    Container.set(`${DB_CONTROLLERS_NAMESPACE}.ResultWrapper`, new ResultWrapper(Container));
    Container.set(`${DB_CONTROLLERS_NAMESPACE}.Users`, new Users(Container));
  }

  _getControllerInstance(controllerName) {
    return Container.get(`${DB_CONTROLLERS_NAMESPACE}.${controllerName}`);
  }

  start({ config }) {
    if (this.initialized) {
      throw new Error('Tried to initialize the database twice!');
    }

    this.knex = Knex(config.connection);
    Model.knex(this.knex);
    this._initControllers();
    this.initialized = true;
  }

  stop() {
    this.knex.destroy();
    this.initialized = false;
  }

  getKnex() {
    return this.knex;
  }

  executeDBAction(controllerName) {
    const controllerInstance = this._getControllerInstance(controllerName);

    return methodName => {
      return (data = {}, config = {}) => {
        return transaction(Model.knex(), async transaction => {
          return Reflect.apply(controllerInstance[methodName], controllerInstance, [data, { ...config, transaction }]);
        });
      }
    }
  }
}

module.exports = new DB();