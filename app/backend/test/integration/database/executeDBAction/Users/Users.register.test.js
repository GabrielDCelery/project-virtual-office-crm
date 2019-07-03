const { expect } = require('chai');
const {
  getKnex,
  executeDBAction
} = globalRequire('database');

describe('executeDBAction("Users", "register")', () => {
  beforeEach(async () => {
    await getKnex().seed.run();
  });

  it('registers a new inactive user', async () => {
    // Given
    const data = {
      "email": "test4@test.com",
      "password": "mypassword"
    };
    const config = {};

    // When
    const result = await executeDBAction('Users', 'register', { data, config });

    // Then
    expect(result.success).to.deep.equal(true);
    expect(result.errors).to.deep.equal([]);
    expect(result.payload.id).to.deep.equal(4);
    expect(result.payload.email).to.deep.equal('test4@test.com');
    expect(result.payload.status).to.deep.equal(0);
  });

  it('returns an error if user is already registered', async () => {
    // Given
    const data = {
      "email": "test@test.com",
      "password": "mypassword"
    };
    const config = {};

    // When
    const result = await executeDBAction('Users', 'register', { data, config });

    // Then
    expect(result).to.deep.equal({
      "success": false,
      "errors": ["Email already registered!"],
      "payload": null
    });
  });
});