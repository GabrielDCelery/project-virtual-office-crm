import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './user.constants';

const login = function login({ email, password }, successCallback = () => { }) {
  return async dispatch => {
  };
}

const logout = function logout(successCallback = () => { }) {
  return dispatch => {
  }
}

export default {
  login,
  logout
};
