const { expect } = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const redis = globalRequire('redis');
const services = globalRequire('services');

describe('api/addresses', () => {
  beforeEach(async () => {
    await redis.flushRedis();
    sinon.spy(services, 'executeService');
  });

  afterEach(async () => {
    services.executeService.restore();
  });

  it('returns a list of addresses', async () => {
    // Given
    const { BACKEND_APP_PORT } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/addresses`;

    // When
    const result = await axios.get(endpoint);
    const { status, data } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": [{
        "id": 1,
        "location_id": 1,
        "postcode": "1033",
        "city_id": 310,
        "city_name": "Budapest",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "address_line_1": "Miklós u. 13.",
        "address_line_2": "VIII/42.",
        "created_at": "2018-11-11T11:11:11.000Z",
        "updated_at": "2018-11-11T11:11:11.000Z"
      }, {
        "id": 2,
        "location_id": 1,
        "postcode": "1033",
        "city_id": 310,
        "city_name": "Budapest",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "address_line_1": "Kiscelli utca 45.",
        "address_line_2": null,
        "created_at": "2018-11-11T11:11:11.000Z",
        "updated_at": "2018-11-11T11:11:11.000Z"
      }, {
        "id": 3,
        "location_id": 3,
        "postcode": "8000",
        "city_id": 2528,
        "city_name": "Székesfehérvár",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "address_line_1": "Melencei u. 35-37.",
        "address_line_2": null,
        "created_at": "2018-11-11T11:11:11.000Z",
        "updated_at": "2018-11-11T11:11:11.000Z",
      }, {
        "id": 4,
        "location_id": 4,
        "postcode": "3527",
        "city_id": 1668,
        "city_name": "Miskolc",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "address_line_1": "József Attila u. 56.",
        "address_line_2": null,
        "created_at": "2018-11-11T11:11:11.000Z",
        "updated_at": "2018-11-11T11:11:11.000Z"
      }, {
        "id": 5,
        "location_id": 2,
        "postcode": "1054",
        "city_id": 310,
        "city_name": "Budapest",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "address_line_1": "Báthory utca 6-4.",
        "address_line_2": "3. emelet 12.",
        "created_at": "2018-11-11T11:11:11.000Z",
        "updated_at": "2018-11-11T11:11:11.000Z"
      }]
    });
    expect(services.executeService.callCount).to.equal(1);
    expect(services.executeService.args[0]).to.deep.equal([
      'Addresses',
      'findAll',
      { data: {}, config: { bFlatten: true } }
    ]);
  });
});