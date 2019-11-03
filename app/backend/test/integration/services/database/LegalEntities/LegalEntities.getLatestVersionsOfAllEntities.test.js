const { expect } = require('chai');
//const verror = require("verror");
const services = require('../../../../../src/services');

describe('services.get("database").execute("legalEntities", "getLatestVersionsOfAllEntities")', () => {
  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
  });

  afterEach(async () => {});

  it('gets latest versions of legal entities', async () => {
    // Given
    const controller = 'legalEntities';
    const method = 'getLatestVersionsOfAllEntities';

    // When
    const result = await services.get('database').execute(controller, method);

    // Then
    expect(result).to.deep.equal({
      success: true,
      service: 'database',
      errors: [],
      payload: [
        {
          id: 1,
          shortName: 'Bacz Invest',
          longName: 'Bacz Invest Elektro Technikai',
          type: 'limited liability company',
          registrationId: '03-01-131101',
          taxId: '13781174-1-42',
          permanentAddressId: 1,
          version: 0,
          versionStartAt: new Date('2019-08-01T11:11:11.000Z')
        },
        {
          id: 2,
          shortName: 'Chrono-Line',
          longName: 'Chrono-Line',
          type: 'limited liability company',
          registrationId: '02-03-529212',
          taxId: '31580371-1-42',
          permanentAddressId: 1,
          version: 2,
          versionStartAt: new Date('2019-08-09T11:11:11.000Z')
        }
      ]
    });
  });
});
