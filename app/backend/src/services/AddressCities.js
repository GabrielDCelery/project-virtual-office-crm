const database = globalRequire('database');
const redis = globalRequire('redis');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');

class AddressCities {
  constructor(container) {
    this.resultWrapper = container.get(`${TYPEDI_NAMESPACE_SERVICES}.ResultWrapper`);
  }

  async findAll() {
    const wrappedRedisResult = await redis.executeRedisAction('AddressCities', 'getAsync');

    if (!wrappedRedisResult.success || wrappedRedisResult.payload) {
      return wrappedRedisResult
    };

    const wrappedDBResult = await database.executeDBAction(
      'AddressCities',
      'findAll',
      { data: {}, config: {} }
    );

    if (!wrappedDBResult.success || !wrappedDBResult.payload) {
      return wrappedDBResult
    };

    await redis.executeRedisAction('AddressCities', 'setAsync', wrappedDBResult.payload);

    return wrappedDBResult;
  }
}

module.exports = AddressCities;