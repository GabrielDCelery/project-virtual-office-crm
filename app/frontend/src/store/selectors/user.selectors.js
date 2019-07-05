import _ from 'lodash';
import { createSelector } from 'reselect';

const getUserEmail = state => {
  return _.get(state, ['user', 'email'], []);
};
const getUserRules = state => {
  return _.get(state, ['user', 'rules'], []);
};
const getRbacRule = (state, props = {}) => {
  return props.rbacRule;
};

export default {
  isUserAuthenticated: createSelector([getUserEmail], email => {
    return !_.isNil(email);
  }),
  isUserAuthorized: createSelector([getUserRules, getRbacRule], (userRules, rbacRule) => {
    return _.isNil(rbacRule) || userRules.includes(rbacRule);
  })
};