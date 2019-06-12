import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './user.constants';
import services from 'services';

const login = function login({ email, password }, successCallback = () => { }) {
  return async dispatch => {
    dispatch({ type: LOGIN_REQUEST, payload: null, errors: [] });

    const { success, errors, payload } = await services.user.authentication.login({ email, password });

    if (!success) {
      return dispatch({ type: LOGIN_FAILURE, payload: null, errors: errors });
    }

    const { jwt } = payload;

    services.user.authentication.setStoredLoginCredentials({ email, jwt });
    dispatch({ type: LOGIN_SUCCESS, payload: { email, jwt }, errors: [] });

    return successCallback();
  };
}

const logout = function logout(successCallback = () => { }) {
  return dispatch => {
    services.user.authentication.logout();
    dispatch({ type: LOGOUT, payload: null, errors: [] });

    return successCallback();
  }
}

export default {
  login,
  logout
};
