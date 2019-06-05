const Knex = require('knex');
const { Model, transaction } = require('objection');
const { Container } = require('typedi');
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

  start(config) {
    if (this.initialized) {
      throw new Error('Tried to initialize the database twice!');
    }

    this.knex = Knex(config);
    Model.knex(this.knex);
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
    const controller = controllers[controllerName];

    if (!controller) {
      throw new Error(`Could not find controller -> ${controllerName}`);
    }

    return methodName => {
      const controllerInstance = Container.get(controller);
      const methodToExecute = controllerInstance[methodName];

      if (!methodToExecute) {
        throw new Error(`Could not find method for controller ${controllerName} -> ${methodToExecute}`);
      }

      return (data = {}, config = {}) => {
        return transaction(Model.knex(), async transaction => {
          return Reflect.apply(methodToExecute, controllerInstance, [data, { ...config, transaction }]);
        });
      }
    }
  }
}

module.exports = new DB();