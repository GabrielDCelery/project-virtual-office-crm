const Users = require('./Users');
const { Container } = require('typedi');
const { ResultWrapper } = require('../helpers');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');

const services = {
  Users
};

class Services {
  constructor() {
    this.initialized = false;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.executeService = this.executeService.bind(this);
  }

  _initServices() {
    Container.set(`${TYPEDI_NAMESPACE_SERVICES}.ResultWrapper`, new ResultWrapper(Container));
    Container.set(`${TYPEDI_NAMESPACE_SERVICES}.Users`, new Users(Container));
  }

  async start() {
    if (this.initialized) {
      throw new Error('Tried to initialize services twice!');
    }

    this._initServices();
    this.initialized = true;
  }

  async stop() {
    this.initialized = false;
  }

  executeService(serviceName) {
    const serviceInstance = Container.get(`${TYPEDI_NAMESPACE_SERVICES}.${serviceName}`);

    return methodName => {
      return (data = {}) => {
        return Reflect.apply(serviceInstance[methodName], serviceInstance, [data]);
      }
    }
  }
}


module.exports = new Services();