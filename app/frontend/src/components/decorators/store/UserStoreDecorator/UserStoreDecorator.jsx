import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../../store';

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

export const UserStoreDecorator = WrappedComponent => {
  class StoreComponent extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }


  return connect(mapStateToProps, mapActionsToProps)(StoreComponent);
}