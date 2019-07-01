const database = globalRequire('database');
const redis = globalRequire('redis');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');

class AddressCountries {
  constructor(container) {
    this.resultWrapper = container.get(`${TYPEDI_NAMESPACE_SERVICES}.ResultWrapper`);
  }

  async findAll() {
    const wrappedRedisResult = await redis.executeRedisAction('AddressCountries', 'getAsync');
    if (!wrappedRedisResult.success) { return wrappedRedisResult };
    const wrappedDBResult = await database.executeDBAction(
      'AddressCountries',
      'findAll',
      { data: {}, config: {} }
    );
    if (!wrappedDBResult.success) { return wrappedDBResult };

    return this.resultWrapper.return('success')(wrappedDBResult.payload);
  }
}

module.exports = AddressCountries;