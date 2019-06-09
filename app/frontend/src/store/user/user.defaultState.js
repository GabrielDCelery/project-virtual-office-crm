const cachedUser = null;

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
