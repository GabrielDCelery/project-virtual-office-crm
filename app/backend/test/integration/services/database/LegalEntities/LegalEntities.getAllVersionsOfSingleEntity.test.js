const { expect } = require('chai');
//const verror = require("verror");
const services = require('../../../../../src/services');

describe('execute("legalEntities", "getAllVersionsOfSingleEntity", {})', () => {
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
    const method = 'getAllVersionsOfSingleEntity';
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
          legalEntityId: 2,
          shortName: 'Chrono-Line',
          longName: 'Chrono-Line',
          type: 'Limited Liability Company',
          registrationId: '02-03-529212',
          taxId: '31580371-1-42',
          permanentAddressId: 1,
          version: 2,
          versionStartAt: new Date('2019-08-09T11:11:11.000Z'),
          versionEndAt: null
        },
        {
          legalEntityId: 2,
          shortName: 'Chrono-Line',
          longName: 'Chrono-Line',
          type: 'Limited Liability Company',
          registrationId: '02-03-529212',
          taxId: '41580371-1-42',
          permanentAddressId: 1,
          version: 1,
          versionStartAt: new Date('2018-09-02T11:11:11.000Z'),
          versionEndAt: new Date('2019-08-09T11:11:11.000Z')
        },
        {
          legalEntityId: 2,
          shortName: 'Chrono-Trigger',
          longName: 'Chrono-Trigger',
          type: 'Limited Liability Company',
          registrationId: '02-03-529212',
          taxId: '41580371-1-42',
          permanentAddressId: 1,
          version: 0,
          versionStartAt: new Date('2018-08-03T11:11:11.000Z'),
          versionEndAt: new Date('2018-09-02T11:11:11.000Z')
        }
      ]
    });
  });
});
