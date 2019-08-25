const { expect } = require('chai');
const {
  getKnex,
  executeDBAction
} = globalRequire('database');

describe('executeDBAction("Users", "authenticate")', () => {
  it('authenticates an existing user using email and password', async () => {
    // Given
    const data = {
      "email": "test@test.com",
      "password": "password"
    };
    const config = {};

    // When
    const result = await executeDBAction('Users', 'authenticate', { data, config });

    // Then
    expect(result).to.deep.equal({
      "success": true,
      "errors": [],
      "payload": {
        "id": 1
      }
    });
  });

  it('returns an error if it could not find the account', async () => {
    // Given
    const data = {
      "email": "doesnotexist@test.com",
      "password": "password"
    };
    const config = {};

    // When
    const result = await executeDBAction('Users', 'authenticate', { data, config });

    // Then
    expect(result).to.deep.equal({
      "success": false,
      "errors": ["The email and password combination you entered is invalid!"],
      "payload": null
    });
  });

  it('returns an error if the password is invalid', async () => {
    // Given
    const data = {
      "email": "test@test.com",
      "password": "somebspassword"
    };
    const config = {};

    // When
    const result = await executeDBAction('Users', 'authenticate', { data, config });

    // Then
    expect(result).to.deep.equal({
      "success": false,
      "errors": ["The email and password combination you entered is invalid!"],
      "payload": null
    });
  });

  it('returns an error if the account is inactive', async () => {
    // Given
    const data = {
      "email": "test2@test.com",
      "password": "password"
    };
    const config = {};

    // When
    const result = await executeDBAction('Users', 'authenticate', { data, config });

    // Then
    expect(result).to.deep.equal({
      "success": false,
      "errors": ["This account is inactive!"],
      "payload": null
    });
  });

  it('returns an error if the account is suspended ', async () => {
    // Given
    const data = {
      "email": "test3@test.com",
      "password": "password"
    };
    const config = {};

    // When
    const result = await executeDBAction('Users', 'authenticate', { data, config });

    // Then
    expect(result).to.deep.equal({
      "success": false,
      "errors": ["This account is suspended!"],
      "payload": null
    });
  });
});