import _ from 'lodash';
import { createSelector } from 'reselect';

const getHasUserLoginFailed = state => _.get(state, ['user', 'hasLoginFailed'], false);
const getIsUserLoggingIn = state => _.get(state, ['user', 'isLoggingIn'], false);
const getIsUserLoggedIn = state => _.get(state, ['user', 'isLoggedIn'], false);
const getLoginErrors = state => _.get(state, ['user', 'errors'], false);

export default {
  hasUserLoginFailed: createSelector([getHasUserLoginFailed], hasUserLoginFailed => hasUserLoginFailed),
  isUserLoggingIn: createSelector([getIsUserLoggingIn], isUserLoggingIn => isUserLoggingIn),
  isUserLoggedIn: createSelector([getIsUserLoggedIn], isUserLoggedIn => isUserLoggedIn),
  loginErrors:createSelector([getLoginErrors], loginErrors => loginErrors)
};
