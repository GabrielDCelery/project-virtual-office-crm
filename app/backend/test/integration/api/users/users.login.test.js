const { expect } = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const services = require('../../../../src/services');

describe('/api/users/login', () => {
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

  it('successfully authenticates a registered user', async () => {
    // Given
    const { BACKEND_APP_PORT } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/users/login`;

    // When
    const result = await axios.post(endpoint, {
      email: 'test@test.com',
      password: 'password'
    });
    const { status, data } = result;

    // Then
    expect(status).to.equal(200);
    expect(data).to.deep.equal({
      success: true,
      errors: [],
      payload: {
        email: 'test@test.com',
        rules: ['*']
      }
    });
  });

  it('returns a cookie in the header containing a JWT token for authenticated user', async () => {
    //Setup
    const REGEXP_COOKIE = /PVOCRM_SESSION_ID=[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+\/=]*;\sPath=\/;\sHttpOnly;\sSecure/;

    // Given
    const { BACKEND_APP_PORT } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/users/login`;

    // When
    const result = await axios.post(endpoint, {
      email: 'test@test.com',
      password: 'password'
    });
    const { headers } = result;

    // Then
    expect(headers.hasOwnProperty('set-cookie')).to.equal(true);
    expect(Array.isArray(headers['set-cookie'])).to.equal(true);
    expect(new RegExp(REGEXP_COOKIE).test(headers['set-cookie'][0])).to.equal(
      true
    );
  });
});
