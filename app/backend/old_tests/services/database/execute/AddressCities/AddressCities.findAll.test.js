const { expect } = require('chai');
const {
  executeDBAction
} = globalRequire('database');

describe('executeDBAction("AddressCities", "findAll")', () => {
  it('returns all cities in a nested structure', async () => {
    // Given
    const data = {};
    const config = {};

    // When
    const result = await executeDBAction('AddressCities', 'findAll', { data, config });
    const { success, errors, payload } = result;

    // Then
    expect(success).to.equal(true);
    expect(errors).to.deep.equal([]);
    expect(payload.length).to.equal(globalRequire('database/seeds/data/address_cities').length);
    expect(payload[0]).to.deep.equal({
      "id": 1,
      "name": "Aba",
      "country_id": 98,
      "country": {
        "id": 98,
        "name": "Hungary",
        "short_name": "HU"
      }
    });
  });

  it('returns all cities in a flat structure', async () => {
    // Given
    const data = {};
    const config = { bFlatten: true };

    // When
    const result = await executeDBAction('AddressCities', 'findAll', { data, config });
    const { success, errors, payload } = result;

    // Then
    expect(success).to.equal(true);
    expect(errors).to.deep.equal([]);
    expect(payload.length).to.equal(globalRequire('database/seeds/data/address_cities').length);
    expect(payload[0]).to.deep.equal({
      "id": 1,
      "name": "Aba",
      "country_id": 98,
      "country_name": "Hungary",
      "country_short_name": "HU"
    });
  });
});