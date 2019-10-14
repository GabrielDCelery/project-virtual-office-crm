const { expect } = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const services = require('../../../../src/services');

describe('/api/legalEntities/update', () => {
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
    const { BACKEND_APP_PORT } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/legalEntities/update`;

    // When
    const result = await axios.post(endpoint, {
      id: 2,
      longName: 'Chrono-Line New',
      permanentAddressId: 2
    });
    const { status, data } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal({
      success: true,
      service: 'database',
      errors: [],
      payload: [
        {
          legalEntityId: 2,
          shortName: 'Chrono-Line',
          longName: 'Chrono-Line New',
          type: 'limited liability company',
          registrationId: '02-03-529212',
          taxId: '31580371-1-42',
          permanentAddressId: 2,
          version: 3,
          versionStartAt: '2019-08-27T11:11:11.000Z',
          versionEndAt: null
        },
        {
          legalEntityId: 2,
          shortName: 'Chrono-Line',
          longName: 'Chrono-Line',
          type: 'limited liability company',
          registrationId: '02-03-529212',
          taxId: '31580371-1-42',
          permanentAddressId: 1,
          version: 2,
          versionStartAt: '2019-08-09T11:11:11.000Z',
          versionEndAt: '2019-08-27T11:11:11.000Z'
        },
        {
          legalEntityId: 2,
          shortName: 'Chrono-Line',
          longName: 'Chrono-Line',
          type: 'limited liability company',
          registrationId: '02-03-529212',
          taxId: '41580371-1-42',
          permanentAddressId: 1,
          version: 1,
          versionStartAt: '2018-09-02T11:11:11.000Z',
          versionEndAt: '2019-08-09T11:11:11.000Z'
        },
        {
          legalEntityId: 2,
          shortName: 'Chrono-Trigger',
          longName: 'Chrono-Trigger',
          type: 'limited liability company',
          registrationId: '02-03-529212',
          taxId: '41580371-1-42',
          permanentAddressId: 1,
          version: 0,
          versionStartAt: '2018-08-03T11:11:11.000Z',
          versionEndAt: '2018-09-02T11:11:11.000Z'
        }
      ]
    });
  });
});
