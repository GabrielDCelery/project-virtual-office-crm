import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const mapStateToProps = state => {
  return {
    stateIsFetchingMailSenders: state.mails.senders.isFetching,
    stateIsFetchingMailSenderNames: state.mails.senderNames.isFetching,
    stateIsFetchingMailSubjects: state.mails.subjects.isFetching,
    stateMailSenderRecommendations: store.selectors.mails.getMailSenderRecommendations(
      state
    ),
    stateMailSenderNameRecommendations: store.selectors.mails.getMailSenderNameRecommendations(
      state
    ),
    stateMailSubjectRecommendations: store.selectors.mails.getMailSubjectRecommendations(
      state
    )
  };
};

const mapActionsToProps = {
  actionFindAllMailSenders: store.actions.mails.findAllMailSenders,
  actionFindAllMailSenderNames: store.actions.mails.findAllMailSenderNames,
  actionFindAllMailSubjects: store.actions.mails.findAllMailSubjects
};

export const MailsStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
