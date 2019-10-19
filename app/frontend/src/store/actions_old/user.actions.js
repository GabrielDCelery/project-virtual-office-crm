import { USER_LOGIN, USER_LOGOUT } from '../constants';
import services from 'services';

const login = ({ email, password }, successCallback = () => {}) => {
  return async dispatch => {
    const {
      success,
      //errors,
      payload
    } = await services.api.user.authentication.login({ email, password });

    if (!success) {
      return;
    }

    const { jwt } = payload;

    await services.api.user.authentication.setStoredLoginCredentials({
      email,
      jwt
    });
    dispatch({ type: USER_LOGIN, email, jwt });

    return successCallback();
  };
};

const logout = (successCallback = () => {}) => {
  return async dispatch => {
    await services.api.user.authentication.logout();

    dispatch({ type: USER_LOGOUT });

    return successCallback();
  };
};

export default {
  login,
  logout
};
