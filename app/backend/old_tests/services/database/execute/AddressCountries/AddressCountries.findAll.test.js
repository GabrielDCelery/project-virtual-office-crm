const { expect } = require('chai');
const {
  executeDBAction
} = globalRequire('database');

describe('executeDBAction("AddressCountries", "findAll")', () => {
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