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
      const methodToTest = executeDBAction('AddressCountries')('findById');
      const data = {
        "id": 98
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result).toEqual({
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
      const methodToTest = executeDBAction('AddressCountries')('findAll');

      // When
      const result = await methodToTest();

      // Then
      expect(result).toEqual({
        "success": true,
        "errors": [],
        "payload": globalRequire('database/seeds/data/address_countries')
      });
    });
  });
});