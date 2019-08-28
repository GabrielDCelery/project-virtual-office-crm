const {
  expect
} = require('chai');
const axios = require('axios');

describe('api/users/authenticate', () => {
  beforeEach(async () => {});

  it('returns a signed jwt token for an authenticated user', async () => {
    // Given
    const {
      BACKEND_APP_PORT
    } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/users/authenticate`;
    const requestBody = {
      "email": "test@test.com",
      "password": "password"
    };

    // When
    const result = await axios.post(endpoint, requestBody);
    const {
      status,
      data
    } = result;
    const {
      success,
      errors,
      payload
    } = data;

    // Then
    const JWT_REGEXP = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    expect(status).to.deep.equal(200);
    expect(success).to.deep.equal(true);
    expect(errors).to.deep.equal([]);
    expect(JWT_REGEXP.test(payload.jwt)).to.deep.equal(true);
  });

  it('returns an error if user does not exist', async () => {
    // Given
    const {
      BACKEND_APP_PORT
    } = process.env;
    const endpoint = `http://localhost:${BACKEND_APP_PORT}/api/users/authenticate`;
    const requestBody = {
      "email": "test@test.com",
      "password": "somebspassword"
    };

    // When
    const result = await axios.post(endpoint, requestBody);
    const {
      status,
      data
    } = result;

    // Then
    expect(status).to.deep.equal(200);
    expect(data).to.deep.equal({
      "success": false,
      "errors": ["The email and password combination you entered is invalid!"],
      "payload": null
    });
  });
});