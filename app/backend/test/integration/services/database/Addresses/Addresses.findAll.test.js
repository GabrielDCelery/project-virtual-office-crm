const {
  expect
} = require("chai");
const verror = require("verror");
const services = require("../../../../../src/services");

describe('execute("addresses", "findAll")', () => {
  beforeEach(async () => {
    await services.get("database").getKnex().seed.run();
  });

  afterEach(async () => {});

  it('returns all the addresses in a nested structure', async () => {
    // Given
    const controller = 'addresses';
    const method = 'findAll';

    // When
    const result = await services.get("database").execute(controller, method);

    // Then
    expect(result).to.deep.equal({
      "success": true,
      "service": "database",
      "errors": [],
      "payload": [{
        "id": 1,
        "postcode": "1033",
        "city_id": 310,
        "long_street": "Miklós u. 13. VIII/42.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z"),
        "city": {
          "id": 310,
          "name": "Budapest",
          "country_id": 98,
          "country": {
            "id": 98,
            "name": "Hungary",
            "short_name": "HU"
          }
        }
      }, {
        "id": 2,
        "postcode": "1033",
        "city_id": 310,
        "long_street": "Kiscelli utca 45.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z"),
        "city": {
          "id": 310,
          "name": "Budapest",
          "country_id": 98,
          "country": {
            "id": 98,
            "name": "Hungary",
            "short_name": "HU"
          }
        }
      }, {
        "id": 3,
        "postcode": "8000",
        "city_id": 2528,
        "long_street": "Melencei u. 35-37.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z"),
        "city": {
          "id": 2528,
          "name": "Székesfehérvár",
          "country_id": 98,
          "country": {
            "id": 98,
            "name": "Hungary",
            "short_name": "HU"
          }
        }
      }, {
        "id": 4,
        "postcode": "3527",
        "city_id": 1668,
        "long_street": "József Attila u. 56.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z"),
        "city": {
          "id": 1668,
          "name": "Miskolc",
          "country_id": 98,
          "country": {
            "id": 98,
            "name": "Hungary",
            "short_name": "HU"
          }
        }
      }, {
        "id": 5,
        "postcode": "1054",
        "city_id": 310,
        "long_street": "Báthory utca 6-4. 3. emelet 12.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z"),
        "city": {
          "id": 310,
          "name": "Budapest",
          "country_id": 98,
          "country": {
            "id": 98,
            "name": "Hungary",
            "short_name": "HU"
          }
        }
      }]
    });
  });

  it('returns all the addresses in a flat structure', async () => {
    // Given
    const controller = 'addresses';
    const method = 'findAll';
    const args = {
      bFlatten: true
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    // Then
    expect(result).to.deep.equal({
      "success": true,
      "service": "database",
      "errors": [],
      "payload": [{
        "id": 1,
        "postcode": "1033",
        "city_id": 310,
        "city_name": "Budapest",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "long_street": "Miklós u. 13. VIII/42.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z")
      }, {
        "id": 2,
        "postcode": "1033",
        "city_id": 310,
        "city_name": "Budapest",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "long_street": "Kiscelli utca 45.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z")
      }, {
        "id": 3,
        "postcode": "8000",
        "city_id": 2528,
        "city_name": "Székesfehérvár",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "long_street": "Melencei u. 35-37.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z")
      }, {
        "id": 4,
        "postcode": "3527",
        "city_id": 1668,
        "city_name": "Miskolc",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "long_street": "József Attila u. 56.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z")
      }, {
        "id": 5,
        "postcode": "1054",
        "city_id": 310,
        "city_name": "Budapest",
        "country_id": 98,
        "country_name": "Hungary",
        "country_short_name": "HU",
        "long_street": "Báthory utca 6-4. 3. emelet 12.",
        "created_at": new Date("2018-11-11T11:11:11.000Z"),
        "updated_at": new Date("2018-11-11T11:11:11.000Z")
      }]
    });
  });
});