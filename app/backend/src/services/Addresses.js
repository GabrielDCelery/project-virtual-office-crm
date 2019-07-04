const database = globalRequire('database');
const redis = globalRequire('redis');
const { TYPEDI_NAMESPACE_SERVICES } = globalRequire('constants');

class Addresses {
  constructor(container) {
    this.resultWrapper = container.get(`${TYPEDI_NAMESPACE_SERVICES}.ResultWrapper`);
  }

  async findAll({ data, config }) {
    const wrappedRedisResult = await redis.executeRedisAction('Addresses', 'getAsync');

    if (!wrappedRedisResult.success || wrappedRedisResult.payload) {
      return wrappedRedisResult;
    };

    const wrappedDBResult = await database.executeDBAction(
      'Addresses',
      'findAll',
      { data, config }
    );
    
    if (!wrappedDBResult.success || !wrappedDBResult.payload) {
      return wrappedDBResult;
    };

    await redis.executeRedisAction('Addresses', 'setAsync', wrappedDBResult.payload);

    return wrappedDBResult;
  }
}

module.exports = Addresses;