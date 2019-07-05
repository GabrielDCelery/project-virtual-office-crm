import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    stateAppAjaxRequestInProgress: state.app.ajaxRequestInProgress,
    stateAppErrors: state.app.errors
  }
}

const mapActionsToProps = {};

export const AppStoreDecorator = ToWrapComponent => {
  return connect(mapStateToProps, mapActionsToProps)(props => <ToWrapComponent {...props} />);
}