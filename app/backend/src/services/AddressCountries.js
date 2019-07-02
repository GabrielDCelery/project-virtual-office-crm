const database = globalRequire('database');
const redis = globalRequire('redis');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');

class AddressCountries {
  constructor(container) {
    this.resultWrapper = container.get(`${TYPEDI_NAMESPACE_SERVICES}.ResultWrapper`);
  }

  async findAll() {
    const wrappedRedisResult = await redis.executeRedisAction('AddressCountries', 'getAsync');

    if (!wrappedRedisResult.success || wrappedRedisResult.payload) {
      return wrappedRedisResult
    };

    const wrappedDBResult = await database.executeDBAction(
      'AddressCountries',
      'findAll',
      { data: {}, config: {} }
    );

    if (!wrappedDBResult.success || !wrappedDBResult.payload) {
      return wrappedDBResult
    };

    await redis.executeRedisAction('AddressCountries', 'setAsync', wrappedDBResult.payload);

    return wrappedDBResult;
  }
}

module.exports = AddressCountries;