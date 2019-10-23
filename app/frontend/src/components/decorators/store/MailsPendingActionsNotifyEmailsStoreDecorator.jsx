import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const {
  actions: { actionFindAllMailsPendingActionsNotifyEmails }
} = store;

const mapStateToProps = state => {
  return {
    stateIsPendingActionsNotifyEmailsAjaxRequestInProgress:
      state.mails.pendingActions.notifyEmails.isAjaxRequestInProgress,
    statePendingActionsNotifyEmails:
      state.mails.pendingActions.notifyEmails.items
  };
};

const mapActionsToProps = {
  actionFindAllMailsPendingActionsNotifyEmails
};

export const MailsPendingActionsNotifyEmailsStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
