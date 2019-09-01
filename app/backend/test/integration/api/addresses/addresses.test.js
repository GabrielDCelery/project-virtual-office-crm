const { expect } = require('chai');
const axios = require('axios');

describe('/api/addresses', () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  it('returns a list of addresses', async () => {
    // Given
    const { BACKEND_APP_PORT } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/addresses`;

    // When
    const result = await axios.get(endpoint);
    const { status, data } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal({
      success: true,
      service: 'database',
      errors: [],
      payload: [
        {
          id: 1,
          postcode: '1033',
          city_id: 310,
          city_name: 'Budapest',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Miklós u. 13. VIII/42.',
          created_at: '2018-11-11T11:11:11.000Z',
          updated_at: '2018-11-11T11:11:11.000Z'
        },
        {
          id: 2,
          postcode: '1033',
          city_id: 310,
          city_name: 'Budapest',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Kiscelli utca 45.',
          created_at: '2018-11-11T11:11:11.000Z',
          updated_at: '2018-11-11T11:11:11.000Z'
        },
        {
          id: 3,
          postcode: '8000',
          city_id: 2528,
          city_name: 'Székesfehérvár',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Melencei u. 35-37.',
          created_at: '2018-11-11T11:11:11.000Z',
          updated_at: '2018-11-11T11:11:11.000Z'
        },
        {
          id: 4,
          postcode: '3527',
          city_id: 1668,
          city_name: 'Miskolc',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'József Attila u. 56.',
          created_at: '2018-11-11T11:11:11.000Z',
          updated_at: '2018-11-11T11:11:11.000Z'
        },
        {
          id: 5,
          postcode: '1054',
          city_id: 310,
          city_name: 'Budapest',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Báthory utca 6-4. 3. emelet 12.',
          created_at: '2018-11-11T11:11:11.000Z',
          updated_at: '2018-11-11T11:11:11.000Z'
        }
      ]
    });
  });
});
