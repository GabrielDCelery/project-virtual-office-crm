const { expect } = require('chai');
//const verror = require("verror");
const services = require('../src/services');

describe('services.get("database").execute("naturalPeople", "getLatestVersionsOfAllRecords")', () => {
  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
  });

  afterEach(async () => {});

  it('gets latest versions of natural people', async () => {
    // Given
    const controller = 'naturalPeople';
    const method = 'getLatestVersionsOfAllRecords';

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
          firstName: 'Gabriel',
          lastName: 'Celery',
          motherName: 'Ildiko Zeller',
          birthDate: new Date('1983-11-08T00:00:00.000Z'),
          identifierDocumentId: 1,
          permanentAddressId: 1,
          version: 0,
          versionStartAt: new Date('2019-08-01T11:11:11.000Z')
        },
        {
          id: 2,
          firstName: 'Thomas',
          lastName: 'Jefferson',
          motherName: 'Jane Randolph Jefferson',
          birthDate: new Date('1743-04-13T00:00:00.000Z'),
          identifierDocumentId: 1,
          permanentAddressId: 3,
          version: 1,
          versionStartAt: new Date('2019-08-01T11:11:11.000Z')
        }
      ]
    });
  });
});
