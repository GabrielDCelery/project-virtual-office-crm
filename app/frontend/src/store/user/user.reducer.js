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

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        ...{ isLoggingIn: true, isLoggedIn: false, hasLoginFailed: false, errors: [] }
      };

    case LOGIN_SUCCESS:
      const { email, jwt } = payload;
      return {
        ...state,
        ...{ email, jwt },
        ...{ isLoggingIn: false, isLoggedIn: true, hasLoginFailed: false, errors: [] }
      };

    case LOGIN_FAILURE:
      const { errors } = payload;
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
