const { expect } = require('chai');
const sinon = require('sinon');
const redis = globalRequire('redis');
const services = globalRequire('services');
const database = globalRequire('database');

describe('executeService(" AddressCities", "findAll")', () => {
  beforeEach(async () => {
    await redis.flushRedis();
    sinon.spy(redis, 'executeRedisAction');
    sinon.spy(database, 'executeDBAction');
  });

  afterEach(async () => {
    redis.executeRedisAction.restore();
    database.executeDBAction.restore();
  });

  it('returns all cities and associated countries', async () => {
    // Given
    const controllerName = 'AddressCities';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    const result = await services.executeService(controllerName, methodName, { data, config });
    const { success, errors, payload } = result;

    // Then
    expect(success).to.equal(true);
    expect(errors).to.deep.equal([]);
    expect(payload.length).to.equal(globalRequire('database/seeds/data/address_cities').length);
    expect(payload[0]).to.deep.equal({
      "id": 1,
      "name": "Aba",
      "country_id": 98,
      "country": {
        "id": 98,
        "name": "Hungary",
        "short_name": "HU"
      }
    });
  });

  it('returns all cities and associated countries in a flat structure', async () => {
    // Given
    const controllerName = 'AddressCities';
    const methodName = 'findAll';
    const data = {};
    const config = { bFlatten: true };

    // When
    const result = await services.executeService(controllerName, methodName, { data, config });
    const { success, errors, payload } = result;

    // Then
    expect(success).to.equal(true);
    expect(errors).to.deep.equal([]);
    expect(payload.length).to.equal(globalRequire('database/seeds/data/address_cities').length);
    expect(payload[0]).to.deep.equal({
      "id": 1,
      "name": "Aba",
      "country_id": 98,
      "country_name": "Hungary",
      "country_short_name": "HU"
    });
  });

  it('returns the cities and associated countries from the database if they are not cached', async () => {
    // Given
    const controllerName = 'AddressCities';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(database.executeDBAction.callCount).to.equal(1);
    expect(database.executeDBAction.args[0]).to.deep.equal([
      'AddressCities',
      'findAll',
      { data: {}, config: {} }
    ]);
    const { success, errors, payload } = await database.executeDBAction.returnValues[0];
    expect(success).to.equal(true);
    expect(errors).to.deep.equal([]);
    expect(payload[0]).to.deep.equal({
      "id": 1,
      "name": "Aba",
      "country_id": 98,
      "country": {
        "id": 98,
        "name": "Hungary",
        "short_name": "HU"
      }
    });
    expect(redis.executeRedisAction.args[0]).to.deep.equal([
      'AddressCities',
      'getAsync'
    ]);
    expect(await redis.executeRedisAction.returnValues[0]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": null
    });
  });

  it('caches the cities and associated countries in redis', async () => {
    // Setup
    const result = await database.executeDBAction('AddressCities', 'findAll', { data: {}, config: {} });
    await redis.flushRedis();

    // Given
    const controllerName = 'AddressCities';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(redis.executeRedisAction.callCount).to.equal(2);
    expect(redis.executeRedisAction.args[1]).to.deep.equal([
      'AddressCities',
      'setAsync',
      result.payload
    ]);
    expect(await redis.executeRedisAction.returnValues[1]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": "OK"
    });
  });

  it('returns the cached cities and associated countries from redis', async () => {
    // Setup
    const result = await database.executeDBAction('AddressCities', 'findAll', { data: {}, config: {} });
    await redis.executeRedisAction('AddressCities', 'setAsync', result.payload);

    // Given
    const controllerName = 'AddressCities';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(redis.executeRedisAction.callCount).to.equal(2);
    expect(redis.executeRedisAction.args[1]).to.deep.equal(['AddressCities', 'getAsync']);
    const { success, errors, payload } = await redis.executeRedisAction.returnValues[1];
    expect(success).to.equal(true);
    expect(errors).to.deep.equal([]);
    expect(payload.length).to.equal(globalRequire('database/seeds/data/address_cities').length);
    expect(payload[0]).to.deep.equal({
      "id": 1,
      "name": "Aba",
      "country_id": 98,
      "country": {
        "id": 98,
        "name": "Hungary",
        "short_name": "HU"
      }
    });
    expect(database.executeDBAction.callCount).to.equal(1);
  });
});