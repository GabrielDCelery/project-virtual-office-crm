const {
  expect
} = require("chai");
const axios = require("axios");
const sinon = require("sinon");
const services = require("../../../../src/services");

describe('/api/legalEntities/update', () => {
  let clock = null;
  beforeEach(async () => {
    await services.get("database").getKnex().seed.run();
    clock = sinon.useFakeTimers(new Date("2019-08-27T11:11:11.000Z").getTime());
  });

  afterEach(async () => {
    clock.restore();
  });

  it('updates a legal entity', async () => {
    // Given
    const {
      BACKEND_APP_PORT
    } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/legalEntities/update`;

    // When
    const result = await axios.post(endpoint, {
      "id": 2,
      "longName": "Chrono-Line New",
      "permanentAddressId": 2
    });
    const {
      status,
      data
    } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal({
      "success": true,
      "service": "database",
      "errors": [],
      "payload": [{
        "id": 2,
        "short_name": "Chrono-Line",
        "long_name": "Chrono-Line New",
        "type": "Limited Liability Company",
        "registration_id": "02-03-529212",
        "tax_id": "31580371-1-42",
        "permanent_address_id": 2,
        "version": 3,
        "version_start_at": "2019-08-27T11:11:11.000Z"
      }, {
        "id": 3,
        "short_name": "Chrono-Line",
        "long_name": "Chrono-Line",
        "type": "Limited Liability Company",
        "registration_id": "02-03-529212",
        "tax_id": "31580371-1-42",
        "permanent_address_id": 1,
        "legal_entity_id": 2,
        "version": 2,
        "version_start_at": "2019-08-09T11:11:11.000Z",
        "version_end_at": "2019-08-27T11:11:11.000Z"
      }, {
        "id": 2,
        "short_name": "Chrono-Line",
        "long_name": "Chrono-Line",
        "type": "Limited Liability Company",
        "registration_id": "02-03-529212",
        "tax_id": "41580371-1-42",
        "permanent_address_id": 1,
        "legal_entity_id": 2,
        "version": 1,
        "version_start_at": "2018-09-02T11:11:11.000Z",
        "version_end_at": "2019-08-09T11:11:11.000Z"
      }, {
        "id": 1,
        "short_name": "Chrono-Trigger",
        "long_name": "Chrono-Trigger",
        "type": "Limited Liability Company",
        "registration_id": "02-03-529212",
        "tax_id": "41580371-1-42",
        "permanent_address_id": 1,
        "legal_entity_id": 2,
        "version": 0,
        "version_start_at": "2018-08-03T11:11:11.000Z",
        "version_end_at": "2018-09-02T11:11:11.000Z"
      }]
    });
  });
});