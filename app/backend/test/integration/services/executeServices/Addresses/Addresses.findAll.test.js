const { expect } = require('chai');
const sinon = require('sinon');
const redis = globalRequire('redis');
const services = globalRequire('services');
const database = globalRequire('database');

describe('executeService("Addresses", "findAll")', () => {
  beforeEach(async () => {
    await redis.flushRedis();
    sinon.spy(redis, 'executeRedisAction');
    sinon.spy(database, 'executeDBAction');
  });

  afterEach(async () => {
    redis.executeRedisAction.restore();
    database.executeDBAction.restore();
  });

  it('returns all the addresses in a nested structure', async () => {
    // Given
    const controllerName = 'Addresses';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    const result = await services.executeService(controllerName, methodName, { data, config });

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

  it('returns all the addresses in a flat structure', async () => {
    // Given
    const controllerName = 'Addresses';
    const methodName = 'findAll';
    const data = {};
    const config = { bFlatten: true };

    // When
    const result = await services.executeService(controllerName, methodName, { data, config });

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

  it('returns all the addresses if they are not cached', async () => {
    // Given
    const controllerName = 'Addresses';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(database.executeDBAction.callCount).to.equal(1);
    expect(database.executeDBAction.args[0]).to.deep.equal([
      'Addresses',
      'findAll',
      { data: {}, config: {} }
    ]);
    expect(await database.executeDBAction.returnValues[0]).to.deep.equal({
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
    expect(redis.executeRedisAction.args[0]).to.deep.equal([
      'Addresses',
      'getAsync'
    ]);
    expect(await redis.executeRedisAction.returnValues[0]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": null
    });
  });

  it('caches all the addresses in redis', async () => {
    // Setup
    const result = await database.executeDBAction('Addresses', 'findAll', { data: {}, config: {} });
    await redis.flushRedis();

    // Given
    const controllerName = 'Addresses';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(redis.executeRedisAction.callCount).to.equal(2);
    expect(redis.executeRedisAction.args[1]).to.deep.equal([
      'Addresses',
      'setAsync',
      result.payload
    ]);
    expect(await redis.executeRedisAction.returnValues[1]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": "OK"
    });
  });

  it('returns all the cached addresses from redis', async () => {
    // Setup
    const result = await database.executeDBAction('Addresses', 'findAll', { data: {}, config: {} });
    await redis.executeRedisAction('Addresses', 'setAsync', result.payload);

    // Given
    const controllerName = 'Addresses';
    const methodName = 'findAll';
    const data = {};
    const config = {};

    // When
    await services.executeService(controllerName, methodName, { data, config });

    // Then
    expect(redis.executeRedisAction.callCount).to.equal(2);
    expect(redis.executeRedisAction.args[1]).to.deep.equal(['Addresses', 'getAsync']);
    expect(await redis.executeRedisAction.returnValues[1]).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": [{
        "id": 1,
        "location_id": 1,
        "address_line_1": "Miklós u. 13.",
        "address_line_2": "VIII/42.",
        "created_at": "2019-11-11T11:11:11.000Z",
        "updated_at": "2019-11-11T11:11:11.000Z",
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
        "created_at": "2019-11-11T11:11:11.000Z",
        "updated_at": "2019-11-11T11:11:11.000Z",
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
        "created_at": "2019-11-11T11:11:11.000Z",
        "updated_at": "2019-11-11T11:11:11.000Z",
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
        "created_at": "2019-11-11T11:11:11.000Z",
        "updated_at": "2019-11-11T11:11:11.000Z",
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
        "created_at": "2019-11-11T11:11:11.000Z",
        "updated_at": "2019-11-11T11:11:11.000Z",
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
    expect(database.executeDBAction.callCount).to.equal(1);
  });
});