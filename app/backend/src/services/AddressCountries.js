const { executeDBAction } = globalRequire('database');
const { executeRedisAction } = globalRequire('redis');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');

class AddressCountries {
  constructor(container) {
    this.resultWrapper = container.get(`${TYPEDI_NAMESPACE_SERVICES}.ResultWrapper`);
  }

  async findAll() {
    const wrappedRedisResult = await executeRedisAction('getAsync')('AddressCountries')();
    if (!wrappedRedisResult.success) { return wrappedRedisResult };
    const wrappedDBResult = await executeDBAction('AddressCountries')('findAll')();
    if (!wrappedDBResult.success) { return wrappedDBResult };

    return this.resultWrapper.return('success')(wrappedDBResult.payload);
  }
}

module.exports = AddressCountries;