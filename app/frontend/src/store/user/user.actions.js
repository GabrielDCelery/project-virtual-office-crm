import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './user.constants';
import services from 'services';

const login = ({ email, password }, successCallback = () => { }) => {
  return async dispatch => {
    dispatch({ type: LOGIN_REQUEST, payload: null });

    const { success, errors, payload } = await services.user.authentication.login({ email, password });

    if (!success) {
      return dispatch({ type: LOGIN_FAILURE, payload: { errors } });
    }

    const { jwt } = payload;

    services.user.authentication.setStoredLoginCredentials({ email, jwt });
    dispatch({ type: LOGIN_SUCCESS, payload: { email, jwt } });

    return successCallback();
  };
}

const logout = (successCallback = () => { }) => {
  return async dispatch => {
    await services.user.authentication.logout();

    dispatch({ type: LOGOUT, payload: null, errors: [] });

    return successCallback();
  }
}

export default {
  login,
  logout
};
