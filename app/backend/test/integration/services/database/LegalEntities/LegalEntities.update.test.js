const { expect } = require('chai');
//const verror = require("verror");
const sinon = require('sinon');
const services = require('../../../../../src/services');

describe('execute("legalEntities", "update", {})', () => {
  let clock = null;

  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
    clock = sinon.useFakeTimers(new Date('2019-08-27T11:11:11.000Z').getTime());
  });

  afterEach(async () => {
    clock.restore();
  });

  it('updates a legal entity', async () => {
    // Given
    const controller = 'legalEntities';
    const method = 'update';
    const args = {
      id: 1,
      type: 'Unlimited Partnership',
      taxId: '24892285-1-42'
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
          legalEntityId: 1,
          shortName: 'Bacz Invest',
          longName: 'Bacz Invest Elektro Technikai',
          type: 'Unlimited Partnership',
          registrationId: '03-01-131101',
          taxId: '24892285-1-42',
          permanentAddressId: 1,
          version: 1,
          versionStartAt: new Date('2019-08-27T11:11:11.000Z'),
          versionEndAt: null
        },
        {
          legalEntityId: 1,
          shortName: 'Bacz Invest',
          longName: 'Bacz Invest Elektro Technikai',
          type: 'Limited Liability Company',
          registrationId: '03-01-131101',
          taxId: '13781174-1-42',
          permanentAddressId: 1,
          version: 0,
          versionStartAt: new Date('2019-08-01T11:11:11.000Z'),
          versionEndAt: new Date('2019-08-27T11:11:11.000Z')
        }
      ]
    });
  });
});
