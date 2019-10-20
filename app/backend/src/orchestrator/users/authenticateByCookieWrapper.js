module.exports = services => {
  return async ({ cookie }) => {
    const jwtResult = await services
      .get('authentication')
      .execute('jwt', 'verify', cookie);

    if (!jwtResult.success) {
      return jwtResult;
    }

    if (jwtResult.payload === null) {
      return {
        success: true,
        errors: [],
        payload: {
          email: null,
          rules: []
        }
      };
    }

    const { email } = jwtResult.payload;

    return await services
      .get('database')
      .execute('users', 'getRules', { email });
  };
};
