const { expect } = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const redis = globalRequire('redis');
const database = globalRequire('database');

describe('api/addresses/countries', () => {
  beforeEach(async () => {
    await redis.flushRedis();
  });

  it('returns a list of addresses', async () => {
    // Setup
    const redisSpy = sinon.spy(redis, 'executeRedisAction');
    const dbSpy = sinon.spy(database, 'executeDBAction');

    // Given
    const { BACKEND_APP_PORT } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/addresses/countries`;

    // When
    const result = await axios.get(endpoint);
    const { status, data } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": globalRequire('database/seeds/data/address_countries')
    });
    expect(redis.executeRedisAction.callCount).to.equal(1);
    expect(redis.executeRedisAction.args[0]).to.deep.equal([
      'AddressCountries',
      'getAsync'
    ]);
    expect(await redis.executeRedisAction.returnValues[0]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": null
    });
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

    // Teardown
    redisSpy.restore();
    dbSpy.restore();
  });

  it('returns a list of addresses from cache', async () => {
    // Given
    const { BACKEND_APP_PORT } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/addresses/countries`;

    // When
    const result = await axios.get(endpoint);
    const { status, data } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": globalRequire('database/seeds/data/address_countries')
    });
  });
});