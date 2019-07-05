import {
  APP_AJAX_REQUEST_START,
  APP_AJAX_REQUEST_SUCCESS,
  APP_AJAX_REQUEST_FAIL,
  USER_LOGIN,
  USER_LOGOUT
} from '../constants';
import services from 'services';

const login = ({ email, password }, successCallback = () => { }) => {
  return async dispatch => {
    dispatch({ type: APP_AJAX_REQUEST_START });

    const { success, errors, payload } = await services.user.authentication.login({ email, password });

    if (!success) {
      return dispatch({ type: APP_AJAX_REQUEST_FAIL, errors });
    }

    const { jwt } = payload;

    await services.user.authentication.setStoredLoginCredentials({ email, jwt });
    dispatch({ type: USER_LOGIN, email, jwt });
    dispatch({ type: APP_AJAX_REQUEST_SUCCESS });

    return successCallback();
  };
}

const logout = (successCallback = () => { }) => {
  return async dispatch => {
    await services.user.authentication.logout();

    dispatch({ type: USER_LOGOUT });

    return successCallback();
  }
}

export default {
  login,
  logout
};