import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = (state, props) => {
  return {
    stateIsUserLoggedIn: state.user.isLoggedIn,
    stateIsUserLoggingIn: state.user.isLoggingIn,
    stateHasUserLoginFailed: state.user.hasUserLoginFailed,
    stateLoginErrorMessages: state.user.errors,
    stateIsUserAuthorized: store.user.selectors.isUserAuthorizedSelector(state, props)
  }
}

const mapActionsToProps = {
  actionLogin: store.user.actions.login
};

export const UserStoreDecorator = ToWrapComponent => {
  return connect(mapStateToProps, mapActionsToProps)(props => <ToWrapComponent {...props} />);
}