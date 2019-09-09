import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateIsFetchingMailSenders: state.mails.senders.isFetching,
    stateMailSenderRecommendations: store.selectors.mails.getMailSenderRecommendations(
      state
    )
  };
};

const mapActionsToProps = {
  actionFindAllMailSenders: store.actions.mails.findAllMailSenders
};

export const MailsStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
