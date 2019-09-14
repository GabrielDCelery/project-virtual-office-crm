import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateIsFetchingMailSenders: state.mails.senders.isFetching,
    stateIsFetchingMailSenderNames: state.mails.senderNames.isFetching,
    stateMailSenderRecommendations: store.selectors.mails.getMailSenderRecommendations(
      state
    ),
    stateMailSenderNameRecommendations: store.selectors.mails.getMailSenderNameRecommendations(
      state
    )
  };
};

const mapActionsToProps = {
  actionFindAllMailSenders: store.actions.mails.findAllMailSenders,
  actionFindAllMailSenderNames: store.actions.mails.findAllMailSenderNames
};

export const MailsStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
