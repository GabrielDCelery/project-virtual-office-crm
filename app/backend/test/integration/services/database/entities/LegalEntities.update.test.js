const {
  expect
} = require("chai");
const verror = require("verror");
const sinon = require("sinon");
const services = require("../../../../../src/services");

describe("execute(\"legalEntities\", \"update\", {})", () => {
  let clock = null;

  beforeEach(async () => {
    await services.get("database").getKnex().seed.run();
    clock = sinon.useFakeTimers(new Date("2019-08-27T11:11:11.000Z").getTime());
  });

  afterEach(async () => {
    clock.restore();
  });

  it("updates a legal entity", async () => {
    // Given
    const controller = "legalEntities";
    const method = "update";
    const args = {
      "id": 1,
      "type": 1,
      "taxId": "24892285-1-42"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    // Then
    expect(result).to.deep.equal({
      "success": true,
      "service": "database",
      "errors": [],
      "payload": {
        "current": {
          "id": 1,
          "short_name": "Bacz Invest",
          "long_name": "Bacz Invest Elektro Technikai",
          "type": 1,
          "registration_id": "03-01-131101",
          "tax_id": "24892285-1-42",
          "permanent_address_id": 1,
          "version": 1,
          "version_start_at": new Date("2019-08-27T11:11:11.000Z")
        },
        "versions": [{
          "id": 3,
          "legal_entity_id": 1,
          "short_name": "Bacz Invest",
          "long_name": "Bacz Invest Elektro Technikai",
          "type": 0,
          "registration_id": "03-01-131101",
          "tax_id": "13781174-1-42",
          "permanent_address_id": 1,
          "version": 0,
          "version_start_at": new Date("2019-08-01T11:11:11.000Z"),
          "version_end_at": new Date("2019-08-27T11:11:11.000Z")
        }]
      }
    })
  });
});