const { expect } = require('chai');
//const verror = require("verror");
const services = require('../../../../../src/services');

describe('execute("legalEntities", "getAllVersionsOfAllEntities", {})', () => {
  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
  });

  afterEach(async () => {});

  it('gets all versions of all legal entities', async () => {
    // Given
    const controller = 'legalEntities';
    const method = 'getAllVersionsOfAllEntities';

    // When
    const result = await services.get('database').execute(controller, method);

    // Then
    expect(result).to.deep.equal({
      success: true,
      service: 'database',
      errors: [],
      payload: [
        {
          legal_entity_id: 1,
          long_name: 'Bacz Invest Elektro Technikai',
          type: 'Limited Liability Company'
        },
        {
          legal_entity_id: 2,
          long_name: 'Chrono-Line',
          type: 'Limited Liability Company'
        },
        {
          legal_entity_id: 2,
          long_name: 'Chrono-Trigger',
          type: 'Limited Liability Company'
        }
      ]
    });
  });
});
