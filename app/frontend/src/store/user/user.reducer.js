import { USER_LOGIN, USER_LOGOUT } from './user.constants';

const initialState = {
  email: null,
  rules: [],
  jwt: null
};

export const userReducer = (state = initialState, { type, email, jwt }) => {
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        ...{ email, jwt }
      };

    case USER_LOGOUT:
      return {
        ...state,
        ...{ email: null, jwt: null }
      };

    default:
      return state;
  }
};
