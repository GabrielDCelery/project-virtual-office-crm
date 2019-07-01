const { expect } = require('chai');
const {
  getKnex,
  executeDBAction
} = globalRequire('database');

describe('executeDBAction.Addresses', () => {
  beforeEach(async () => {
    await getKnex().seed.run();
  });

  describe('getAll(data, { transaction })', () => {
    it('returns all adresses as a nested structure', async () => {
      // Given
      const methodToTest = executeDBAction('Addresses')('getAll');
      const data = null;
      const config = {};

      // When
      const result = await methodToTest(data, config);

      // Then
      expect(result).to.deep.equal({
        "success": true,
        "errors": [],
        "payload": [{
          "id": 1,
          "location_id": 1,
          "address_line_1": "Miklós u. 13.",
          "address_line_2": "VIII/42.",
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z"),
          "location": {
            "id": 1,
            "postcode": "1033",
            "city_id": 310,
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
          }
        }, {
          "id": 2,
          "location_id": 1,
          "address_line_1": "Kiscelli utca 45.",
          "address_line_2": null,
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z"),
          "location": {
            "id": 1,
            "postcode": "1033",
            "city_id": 310,
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
          }
        }, {
          "id": 3,
          "location_id": 3,
          "address_line_1": "Melencei u. 35-37.",
          "address_line_2": null,
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z"),
          "location": {
            "id": 3,
            "postcode": "8000",
            "city_id": 2528,
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
          }
        }, {
          "id": 4,
          "location_id": 4,
          "address_line_1": "József Attila u. 56.",
          "address_line_2": null,
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z"),
          "location": {
            "id": 4,
            "postcode": "3527",
            "city_id": 1668,
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
          }
        }, {
          "id": 5,
          "location_id": 2,
          "address_line_1": "Báthory utca 6-4.",
          "address_line_2": "3. emelet 12.",
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z"),
          "location": {
            "id": 2,
            "postcode": "1054",
            "city_id": 310,
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
          }
        }]
      });
    });

    it('returns all adresses in a flattened structure', async () => {
      // Given
      const methodToTest = executeDBAction('Addresses')('getAll');
      const data = null;
      const config = { bFlatten: true };

      // When
      const result = await methodToTest(data, config);

      // Then
      expect(result).to.deep.equal({
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
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z")
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
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z")
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
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z"),
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
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z")
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
          "created_at": new Date("2019-11-11T11:11:11.000Z"),
          "updated_at": new Date("2019-11-11T11:11:11.000Z")
        }]
      });
    });
  });
});