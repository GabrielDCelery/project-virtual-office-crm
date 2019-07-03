const { expect } = require('chai');
const sinon = require('sinon');
const redis = globalRequire('redis');
const services = globalRequire('services');
const database = globalRequire('database');

describe('executeService("AddressCountries", "findAll")', () => {
  beforeEach(async () => {
    await redis.flushRedis();
    sinon.spy(redis, 'executeRedisAction');
    sinon.spy(database, 'executeDBAction');
  });

  afterEach(async () => {
    redis.executeRedisAction.restore();
    database.executeDBAction.restore();
  });

  it('returns all countries', async () => {
    // Given
    const controllerName = 'AddressCountries';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    const result = await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(result).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": globalRequire('database/seeds/data/address_countries')
    });
  });

  it('returns the countries from the database if they are not cached', async () => {
    // Given
    const controllerName = 'AddressCountries';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(database.executeDBAction.callCount).to.equal(1);
    expect(database.executeDBAction.args[0]).to.deep.equal([
      'AddressCountries',
      'findAll',
      { data: {}, config: {} }
    ]);
    expect(await database.executeDBAction.returnValues[0]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": globalRequire('database/seeds/data/address_countries')
    });
    expect(redis.executeRedisAction.args[0]).to.deep.equal([
      'AddressCountries',
      'getAsync'
    ]);
    expect(await redis.executeRedisAction.returnValues[0]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": null
    });
  });

  it('caches the countries in redis', async () => {
    // Given
    const controllerName = 'AddressCountries';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(redis.executeRedisAction.callCount).to.equal(2);
    expect(redis.executeRedisAction.args[1]).to.deep.equal([
      'AddressCountries',
      'setAsync',
      globalRequire('database/seeds/data/address_countries')
    ]);
    expect(await redis.executeRedisAction.returnValues[1]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": "OK"
    });
  });

  it('returns the cached countries from redis', async () => {
    // Setup
    await redis.executeRedisAction('AddressCountries', 'setAsync', globalRequire('database/seeds/data/address_countries'));

    // Given
    const controllerName = 'AddressCountries';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(redis.executeRedisAction.callCount).to.equal(2);
    expect(redis.executeRedisAction.args[1]).to.deep.equal(['AddressCountries', 'getAsync']);
    expect(await redis.executeRedisAction.returnValues[1]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": globalRequire('database/seeds/data/address_countries')
    });
    expect(database.executeDBAction.callCount).to.equal(0);
  });
});