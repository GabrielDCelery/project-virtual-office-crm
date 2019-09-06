const { expect } = require('chai');
//const verror = require('verror');
const sinon = require('sinon');
const services = require('../../../../../src/services');

describe('execute("mailSenders", "findAll", {})', () => {
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

  it('returns all the mail senders in a nested structure', async () => {
    // Given
    const controller = 'mailSenders';
    const method = 'findAll';

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
          address_id: 1,
          name_id: 1,
          address: {
            id: 1,
            postcode: '1033',
            city_id: 310,
            long_street: 'Miklós u. 13. VIII/42.',
            created_at: new Date('2018-11-11T11:11:11.000Z'),
            updated_at: new Date('2018-11-11T11:11:11.000Z'),
            city: {
              id: 310,
              name: 'Budapest',
              country_id: 98,
              country: {
                id: 98,
                name: 'Hungary',
                short_name: 'HU',
                phone_code: '+36'
              }
            }
          },
          name: {
            id: 1,
            name: 'John Doe'
          }
        },
        {
          id: 2,
          address_id: 1,
          name_id: 2,
          address: {
            id: 1,
            postcode: '1033',
            city_id: 310,
            long_street: 'Miklós u. 13. VIII/42.',
            created_at: new Date('2018-11-11T11:11:11.000Z'),
            updated_at: new Date('2018-11-11T11:11:11.000Z'),
            city: {
              id: 310,
              name: 'Budapest',
              country_id: 98,
              country: {
                id: 98,
                name: 'Hungary',
                short_name: 'HU',
                phone_code: '+36'
              }
            }
          },
          name: {
            id: 2,
            name: 'Uzsoki Utcai Kórház'
          }
        },
        {
          id: 3,
          address_id: 2,
          name_id: 4,
          address: {
            id: 2,
            postcode: '1033',
            city_id: 310,
            long_street: 'Kiscelli utca 45.',
            created_at: new Date('2018-11-11T11:11:11.000Z'),
            updated_at: new Date('2018-11-11T11:11:11.000Z'),
            city: {
              id: 310,
              name: 'Budapest',
              country_id: 98,
              country: {
                id: 98,
                name: 'Hungary',
                short_name: 'HU',
                phone_code: '+36'
              }
            }
          },
          name: {
            id: 4,
            name: 'NAV'
          }
        },
        {
          id: 4,
          address_id: 3,
          name_id: 9,
          address: {
            id: 3,
            postcode: '8000',
            city_id: 2528,
            long_street: 'Melencei u. 35-37.',
            created_at: new Date('2018-11-11T11:11:11.000Z'),
            updated_at: new Date('2018-11-11T11:11:11.000Z'),
            city: {
              id: 2528,
              name: 'Székesfehérvár',
              country_id: 98,
              country: {
                id: 98,
                name: 'Hungary',
                short_name: 'HU',
                phone_code: '+36'
              }
            }
          },
          name: {
            id: 9,
            name: 'Hajdú-Bihar Megyei Kormányhivatal'
          }
        },
        {
          id: 5,
          address_id: 4,
          name_id: 4,
          address: {
            id: 4,
            postcode: '3527',
            city_id: 1668,
            long_street: 'József Attila u. 56.',
            created_at: new Date('2018-11-11T11:11:11.000Z'),
            updated_at: new Date('2018-11-11T11:11:11.000Z'),
            city: {
              id: 1668,
              name: 'Miskolc',
              country_id: 98,
              country: {
                id: 98,
                name: 'Hungary',
                short_name: 'HU',
                phone_code: '+36'
              }
            }
          },
          name: {
            id: 4,
            name: 'NAV'
          }
        }
      ]
    });
  });

  it('returns all the mail senders in a flattened structure', async () => {
    // Given
    const controller = 'mailSenders';
    const method = 'findAll';
    const args = {
      bFlatten: true
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
          id: 1,
          postcode: '1033',
          city_id: 310,
          city_name: 'Budapest',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Miklós u. 13. VIII/42.',
          name_id: 1,
          name_name: 'John Doe'
        },
        {
          id: 2,
          postcode: '1033',
          city_id: 310,
          city_name: 'Budapest',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Miklós u. 13. VIII/42.',
          name_id: 2,
          name_name: 'Uzsoki Utcai Kórház'
        },
        {
          id: 3,
          postcode: '1033',
          city_id: 310,
          city_name: 'Budapest',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Kiscelli utca 45.',
          name_id: 4,
          name_name: 'NAV'
        },
        {
          id: 4,
          postcode: '8000',
          city_id: 2528,
          city_name: 'Székesfehérvár',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'Melencei u. 35-37.',
          name_id: 9,
          name_name: 'Hajdú-Bihar Megyei Kormányhivatal'
        },
        {
          id: 5,
          postcode: '3527',
          city_id: 1668,
          city_name: 'Miskolc',
          country_id: 98,
          country_name: 'Hungary',
          country_short_name: 'HU',
          long_street: 'József Attila u. 56.',
          name_id: 4,
          name_name: 'NAV'
        }
      ]
    });
  });
});
