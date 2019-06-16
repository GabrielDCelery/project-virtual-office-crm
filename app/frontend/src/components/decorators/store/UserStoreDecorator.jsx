import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateIsUserLoggedIn: state.user.isLoggedIn,
    stateIsUserLoggingIn: state.user.isLoggingIn,
    stateHasUserLoginFailed: state.user.hasUserLoginFailed,
    stateLoginErrorMessages: state.user.errors
  }
}

const mapActionsToProps = {
  actionLogin: store.user.actions.login
};

export const UserStoreDecorator = ToWrapComponent => {
  return connect(mapStateToProps, mapActionsToProps)(props => <ToWrapComponent {...props} />);
}