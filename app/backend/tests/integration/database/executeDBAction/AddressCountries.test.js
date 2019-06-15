const {
  getKnex,
  executeDBAction
} = globalRequire('database');

describe('executeDBAction.AddressCountries', () => {
  beforeEach(async () => {
    await getKnex().seed.run();
  });

  describe('getById({ id }, { transaction })', () => {
    it('finds a country by id', async () => {
      // Given
      const methodToTest = executeDBAction('AddressCountries')('getById');
      const input = {
        "id": 98
      };

      // When
      const result = await methodToTest(input);

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
});