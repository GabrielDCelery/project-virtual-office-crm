import {
  USER_DATA_SET_EMAIL,
  USER_DATA_SET_RULES,
  USER_DATA_RESET
} from './userData.constants';
import { SNACKBAR_OPEN_ERROR } from '../../snackbar';
import {
  APP_LOADING_SCREEN_TURN_ON,
  APP_LOADING_SCREEN_TURN_OFF
} from '../../app';
import services from 'services';

export const actionLogin = (
  { email, password },
  successCallback = () => {}
) => {
  return async dispatch => {
    dispatch({ type: USER_DATA_RESET });

    const {
      success,
      errors,
      payload
    } = await services.api.user.authentication.login({ email, password });

    if (!success) {
      dispatch({ type: SNACKBAR_OPEN_ERROR, message: errors[0] });
      return;
    }

    dispatch({ type: USER_DATA_SET_EMAIL, email: payload['email'] });
    dispatch({ type: USER_DATA_SET_RULES, rules: payload['rules'] });

    return successCallback();
  };
};

export const actionLogout = (successCallback = () => {}) => {
  return async dispatch => {
    dispatch({ type: USER_DATA_RESET });

    await services.api.user.authentication.logout();

    return successCallback();
  };
};

export const actionAuthenticateUserByCookie = () => {
  return async dispatch => {
    dispatch({ type: APP_LOADING_SCREEN_TURN_ON });
    dispatch({ type: USER_DATA_RESET });

    const {
      success,
      errors,
      payload
    } = await services.api.user.authentication.authenticateByCookie();

    if (!success) {
      dispatch({ type: SNACKBAR_OPEN_ERROR, message: errors[0] });
      return;
    }

    const { email, rules } = payload;

    dispatch({ type: USER_DATA_SET_EMAIL, email });
    dispatch({ type: USER_DATA_SET_RULES, rules });
    dispatch({ type: APP_LOADING_SCREEN_TURN_OFF });
  };
};
