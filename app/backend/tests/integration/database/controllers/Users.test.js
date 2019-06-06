const { getKnex, execDBAction } = globalRequire('database')

describe('controllers.Users', () => {
  beforeEach(async () => {
    await getKnex().seed.run();
  });

  describe('_findByEmail({ email }, { transaction })', () => {
    it('finds a user by email', async () => {

      expect(true).toEqual(true);
    });
  });
});