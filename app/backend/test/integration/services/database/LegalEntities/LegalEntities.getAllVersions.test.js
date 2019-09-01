const { expect } = require('chai');
//const verror = require("verror");
const services = require('../../../../../src/services');

describe('execute("legalEntities", "getAllVersions", {})', () => {
  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
  });

  afterEach(async () => {});

  it('gets all versions of a legal entity', async () => {
    // Given
    const controller = 'legalEntities';
    const method = 'getAllVersions';
    const args = {
      id: 2
    };

    // When
    const result = await services
      .get('database')
      .execute(controller, method, args);

    // Then
    expect(result).to.deep.equal({
      success: true,
      service: 'database',
      errors: [],
      payload: [
        {
          id: 2,
          short_name: 'Chrono-Line',
          long_name: 'Chrono-Line',
          type: 'Limited Liability Company',
          registration_id: '02-03-529212',
          tax_id: '31580371-1-42',
          permanent_address_id: 1,
          version: 2,
          version_start_at: new Date('2019-08-09T11:11:11.000Z')
        },
        {
          id: 2,
          short_name: 'Chrono-Line',
          long_name: 'Chrono-Line',
          type: 'Limited Liability Company',
          registration_id: '02-03-529212',
          tax_id: '41580371-1-42',
          permanent_address_id: 1,
          legal_entity_id: 2,
          version: 1,
          version_start_at: new Date('2018-09-02T11:11:11.000Z'),
          version_end_at: new Date('2019-08-09T11:11:11.000Z')
        },
        {
          id: 1,
          short_name: 'Chrono-Trigger',
          long_name: 'Chrono-Trigger',
          type: 'Limited Liability Company',
          registration_id: '02-03-529212',
          tax_id: '41580371-1-42',
          permanent_address_id: 1,
          legal_entity_id: 2,
          version: 0,
          version_start_at: new Date('2018-08-03T11:11:11.000Z'),
          version_end_at: new Date('2018-09-02T11:11:11.000Z')
        }
      ]
    });
  });
});
