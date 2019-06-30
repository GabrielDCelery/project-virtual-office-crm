const { expect } = require('chai');
const axios = require('axios');
const { flushRedis } = globalRequire('redis');

describe('api/addresses/countries', () => {
  beforeEach(async () => {
    await flushRedis();
  });

  it('returns a list of addresses', async () => {
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