const { expect } = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const redis = globalRequire('redis');
const services = globalRequire('services');

describe('api/addresses/countries', () => {
  beforeEach(async () => {
    await redis.flushRedis();
  });

  it('returns a list of addresses', async () => {
    // Setup
    sinon.spy(services, 'executeService');

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
    expect(services.executeService.callCount).to.equal(1);
    expect(services.executeService.args[0]).to.deep.equal([
      'AddressCountries',
      'findAll',
      { data: {}, config: {} }
    ]);

    // Teardown
    services.executeService.restore();
  });
});