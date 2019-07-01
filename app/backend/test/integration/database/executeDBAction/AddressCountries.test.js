const { expect } = require('chai');
const {
  getKnex,
  executeDBAction
} = globalRequire('database');

describe('executeDBAction.AddressCountries', () => {
  beforeEach(async () => {
    await getKnex().seed.run();
  });

  describe('findById({ id }, { transaction })', () => {
    it('finds a country by id', async () => {
      // Given
      const data = { "id": 98 };
      const config = {};

      // When
      const result = await executeDBAction('AddressCountries', 'findById', { data, config });

      // Then
      expect(result).to.deep.equal({
        "success": true,
        "errors": [],
        "payload": {
          "id": 98,
          "name": "Hungary",
          "short_name": "HU"
        }
      });
    });
  });

  describe('findAll({ id }, { transaction })', () => {
    it('returns all countries', async () => {
      // Given
      const data = {};
      const config = {};

      // When
      const result = await executeDBAction('AddressCountries', 'findAll', { data, config });

      // Then
      expect(result).to.deep.equal({
        "success": true,
        "errors": [],
        "payload": globalRequire('database/seeds/data/address_countries')
      });
    });
  });
});