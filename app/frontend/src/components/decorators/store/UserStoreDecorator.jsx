import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = (state, props) => {
  return {
    stateIsUserAuthenticated: store.selectors.user.isUserAuthenticated(state),
    stateIsUserAuthorized: store.selectors.user.isUserAuthorized(state, props)
  }
}

const mapActionsToProps = {
  actionLogin: store.actions.user.login
};

export const UserStoreDecorator = ToWrapComponent => {
  return connect(mapStateToProps, mapActionsToProps)(props => <ToWrapComponent {...props} />);
}