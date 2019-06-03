const Users = require('./Users');
const { Container } = require('typedi');

const services = {
  Users
};

class Services {
  constructor() {
    this.executeService = this.executeService.bind(this);
  }

  executeService(serviceName) {
    const service = services[serviceName];

    if (!service) {
      throw new Error(`Could not find service -> ${serviceName}`);
    }

    return methodName => {
      const serviceInstance = Container.get(service);
      const methodToExecute = serviceInstance[methodName];

      if (!methodToExecute) {
        throw new Error(`Could not find method for service ${serviceName} -> ${methodToExecute}`);
      }

      return (data = {}) => {
        return Reflect.apply(methodToExecute, serviceInstance, [data]);
      }
    }
  }
}


module.exports = new Services();