import _ from 'lodash';
import { createSelector } from 'reselect';

const getUserRules = state => {
  return _.get(state, ['user', 'rules'], []);
};
const getRbacRule = (state, props = {}) => {
  return props.rbacRule;
};

export default {
  isUserAuthorizedSelector: createSelector([getUserRules, getRbacRule], (userRules, rbacRule) => {
    return _.isNil(rbacRule) || userRules.includes(rbacRule);
  })
};
