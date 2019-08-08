const { Container } = require('typedi');
const { ResultWrapper } = require('../../helpers');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');
const AddressCountries = require('./AddressCountries');
const AddressCities = require('./AddressCities');
const Addresses = require('./Addresses');
const Users = require('./Users');

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
    Container.set(`${TYPEDI_NAMESPACE_SERVICES}.Addresses`, new Addresses(Container));
    Container.set(`${TYPEDI_NAMESPACE_SERVICES}.AddressCities`, new AddressCities(Container));
    Container.set(`${TYPEDI_NAMESPACE_SERVICES}.AddressCountries`, new AddressCountries(Container));
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

  executeService(serviceName, methodName, { data, config }) {
    const serviceInstance = Container.get(`${TYPEDI_NAMESPACE_SERVICES}.${serviceName}`);

    return Reflect.apply(serviceInstance[methodName], serviceInstance, [{ data, config }]);
  }
}


module.exports = new Services();