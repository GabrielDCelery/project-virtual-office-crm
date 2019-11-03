const { expect } = require('chai');
//const verror = require("verror");
const services = require('../../../../../src/services');

describe('services.get("database").execute("naturalPeople", "getAllVersionsOfAllEntities")', () => {
  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
  });

  afterEach(async () => {});

  it('gets all versions of all natural people', async () => {
    // Given
    const controller = 'naturalPeople';
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
          naturalPersonId: 1,
          firstName: 'Gabriel',
          lastName: 'Celery',
          motherName: 'Ildiko Zeller'
        },
        {
          naturalPersonId: 2,
          firstName: 'Thomas',
          lastName: 'Jefferson',
          motherName: 'Jane Randolph Jefferson'
        }
      ]
    });
  });
});
