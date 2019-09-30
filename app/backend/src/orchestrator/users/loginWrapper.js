module.exports = services => {
  return async ({ email, password }) => {
    const dbAuthenticationResult = await services
      .get('database')
      .execute('users', 'authenticate', { email, password });

    if (!dbAuthenticationResult.success) {
      return dbAuthenticationResult;
    }

    const jwtResult = await services
      .get('authentication')
      .execute('jwt', 'sign', {
        userId: dbAuthenticationResult.payload.id,
        email
      });

    return jwtResult;
  };
};
