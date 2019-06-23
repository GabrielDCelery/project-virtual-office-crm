import services from 'services';

const cachedUser = services.user.authentication.getCachedUser();

export default cachedUser ? {
  ...cachedUser,
  ...{
    isLoggingIn: false,
    isLoggedIn: true,
    hasLoginFailed: false,
    errors: []
  }
} : {
    email: null,
    isLoggingIn: false,
    isLoggedIn: false,
    errors: [],
    jwt: null
  };
