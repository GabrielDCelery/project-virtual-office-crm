const { expect } = require('chai');
//const verror = require("verror");
const services = require('../../../../../src/services');

describe('services.get("database").execute("naturalPeople", "getAllVersionsOfSingleEntity")', () => {
  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
  });

  afterEach(async () => {});

  it('gets all versions of a natural person', async () => {
    // Given
    const controller = 'naturalPeople';
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
          naturalPersonId: 2,
          firstName: 'Thomas',
          lastName: 'Jefferson',
          motherName: 'Jane Randolph Jefferson',
          birthDate: new Date('1743-04-13T00:00:00.000Z'),
          identifierDocumentId: 1,
          permanentAddressId: 3,
          version: 1,
          versionStartAt: new Date('2019-08-01T11:11:11.000Z'),
          versionEndAt: null
        },
        {
          naturalPersonId: 2,
          firstName: 'Thomas',
          lastName: 'Jefferson',
          motherName: 'Jane Randolph Jefferson',
          birthDate: new Date('1743-04-13T00:00:00.000Z'),
          identifierDocumentId: 1,
          permanentAddressId: 4,
          version: 0,
          versionStartAt: new Date('2018-06-03T11:11:11.000Z'),
          versionEndAt: new Date('2019-08-01T11:11:11.000Z')
        }
      ]
    });
  });
});
