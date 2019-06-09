import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './user.constants';

const initialState = {
  email: null,
  isLoggingIn: false,
  isLoggedIn: false,
  hasLoginFailed: false,
  errors: [],
  jwt: null
};

export default function userReducer(state = initialState, { type, payload, errors }) {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        ...{ isLoggingIn: true, hasLoginFailed: false, errors: [] }
      };

    case LOGIN_SUCCESS:
      const { jwt, email } = payload;
      return {
        ...state,
        ...{ jwt, email },
        ...{ isLoggingIn: false, isLoggedIn: true, hasLoginFailed: false, errors: [] }
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        ...{ isLoggingIn: false, hasLoginFailed: true, errors: errors }
      };

    case LOGOUT:
      return JSON.parse(JSON.stringify(initialState));

    default:
      return state;
  }
}
