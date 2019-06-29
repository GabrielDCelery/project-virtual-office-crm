const {
  getKnex,
  executeDBAction
} = globalRequire('database');

describe('executeDBAction.Users', () => {
  beforeEach(async () => {
    await getKnex().seed.run();
  });

  describe('register({ email, password }, { transaction })', () => {
    it('registers a new inactive user', async () => {
      // Given
      const methodToTest = executeDBAction('Users')('register');
      const data = {
        "email": "test4@test.com",
        "password": "mypassword"
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result.success).toEqual(true);
      expect(result.errors).toEqual([]);
      expect(result.payload.id).toEqual(4);
      expect(result.payload.email).toEqual('test4@test.com');
      expect(result.payload.status).toEqual(0);
    });

    it('returns an error if user is already registered', async () => {
      // Given
      const methodToTest = executeDBAction('Users')('register');
      const data = {
        "email": "test@test.com",
        "password": "mypassword"
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result).toEqual({
        "success": false,
        "errors": ["Email already registered!"],
        "payload": null
      });
    });
  });

  describe('authenticate({ email, password }, { transaction })', () => {
    it('authenticates an existing user using email and password', async () => {
      // Given
      const methodToTest = executeDBAction('Users')('authenticate');
      const data = {
        "email": "test@test.com",
        "password": "password"
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result).toEqual({
        "success": true,
        "errors": [],
        "payload": {
          "id": 1
        }
      });
    });

    it('returns an error if it could not find the account', async () => {
      // Given
      const methodToTest = executeDBAction('Users')('authenticate');
      const data = {
        "email": "doesnotexist@test.com",
        "password": "password"
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result).toEqual({
        "success": false,
        "errors": ["The email and password combination you entered is invalid!"],
        "payload": null
      });
    });

    it('returns an error if the password is invalid', async () => {
      // Given
      const methodToTest = executeDBAction('Users')('authenticate');
      const data = {
        "email": "test@test.com",
        "password": "somebspassword"
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result).toEqual({
        "success": false,
        "errors": ["The email and password combination you entered is invalid!"],
        "payload": null
      });
    });

    it('returns an error if the account is inactive', async () => {
      // Given
      const methodToTest = executeDBAction('Users')('authenticate');
      const data = {
        "email": "test2@test.com",
        "password": "password"
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result).toEqual({
        "success": false,
        "errors": ["This account is inactive!"],
        "payload": null
      });
    });

    it('returns an error if the account is suspended ', async () => {
      // Given
      const methodToTest = executeDBAction('Users')('authenticate');
      const data = {
        "email": "test3@test.com",
        "password": "password"
      };

      // When
      const result = await methodToTest(data);

      // Then
      expect(result).toEqual({
        "success": false,
        "errors": ["This account is suspended!"],
        "payload": null
      });
    });
  });
});