const Knex = require('knex');
const { Model, transaction } = require('objection');
const { Container } = require('typedi');
const { ResultWrapper } = require('../helpers');
const { TYPEDI_NAMESPACE_DB } = globalRequire('constants');
const controllers = require('./controllers');

class DB {
  constructor() {
    this.knex = null;
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getKnex = this.getKnex.bind(this);
    //this.executeDBAction = this.executeDBAction.bind(this);
  }

  _initControllers() {
    const {
      Users,
      Addresses,
      AddressCountries
    } = controllers;

    Container.set(`${TYPEDI_NAMESPACE_DB}.ResultWrapper`, new ResultWrapper(Container));
    Container.set(`${TYPEDI_NAMESPACE_DB}.Users`, new Users(Container));
    Container.set(`${TYPEDI_NAMESPACE_DB}.Addresses`, new Addresses(Container));
    Container.set(`${TYPEDI_NAMESPACE_DB}.AddressCountries`, new AddressCountries(Container));
  }

  async start({ config }) {
    if (this.initialized) {
      throw new Error('Tried to initialize the database twice!');
    }

    this.knex = Knex(config.connection);
    Model.knex(this.knex);
    this._initControllers();
    this.initialized = true;
  }

  async stop() {
    this.knex.destroy();
    this.initialized = false;
  }

  getKnex() {
    return this.knex;
  }

  executeDBAction(controllerName) {
    const controllerInstance = Container.get(`${TYPEDI_NAMESPACE_DB}.${controllerName}`);

    return methodName => {
      return async (data = {}, config = {}) => {
        return transaction(Model.knex(), async transaction => {
          return Reflect.apply(controllerInstance[methodName], controllerInstance, [data, { ...config, transaction }]);
        });
      }
    }
  }
}

module.exports = new DB();