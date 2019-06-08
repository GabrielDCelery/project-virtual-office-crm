const { getKnex, executeDBAction } = globalRequire('database');

describe('controllers.Users', () => {
  beforeEach(async () => {
    await getKnex().seed.run();
  });

  describe('authenticate({ email, password }, { transaction })', () => {
    it('authenticates an existing user', async () => {
      const user = await executeDBAction('Users')('authenticate')({
        email: 'test@test.com',
        password: 'password'
      });

      expect(user).toEqual({
        "success": true,
        "errors": [],
        "payload": {
          "id": 1,
          "email": "test@test.com",
          "password": "password"
        }
      });
    });
  });
});