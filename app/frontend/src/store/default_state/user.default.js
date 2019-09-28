import services from 'services';

const cachedUser = services.api.user.authentication.getCachedUser();

export default cachedUser
  ? cachedUser
  : {
      email: null,
      rules: [],
      jwt: null
    };
