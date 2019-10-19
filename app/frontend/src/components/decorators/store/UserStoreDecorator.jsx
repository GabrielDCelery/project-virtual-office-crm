import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const {
  actions: { actionLogin, actionLogout, actionAuthenticateUserByCookie },
  selectors: { selectorIsUserAuthenticated, selectorIsUserAuthorized }
} = store;

const mapStateToProps = (state, props) => {
  return {
    stateIsUserAuthenticated: selectorIsUserAuthenticated(state),
    stateIsUserAuthorized: selectorIsUserAuthorized(state, props)
  };
};

const mapActionsToProps = {
  actionLogin,
  actionLogout,
  actionAuthenticateUserByCookie
};

export const UserStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
