import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

const {
  selectors: {
    selectorGetMailSenderNameRecommendations,
    selectorGetMailSenderRecommendations,
    selectorGetMailSubjectRecommendations
  },
  actions: {
    actionCreateNewMailSenderNameAndReFetch,
    actionFindAllMailSenderNames,
    actionFindAllMailSenders,
    actionFindAllMailSubjects,
    actionSetSelectedMailSender,
    actionSetSelectedMailSenderName
  }
} = store;

const mapStateToProps = state => {
  return {
    stateIsMailSendersAjaxRequestInProgress:
      state.mails.senders.isAjaxRequestInProgress,
    stateIsMailSenderNamesAjaxRequestInProgress:
      state.mails.senderNames.isAjaxRequestInProgress,
    stateIsFetchingMailSubjects: state.mails.subjects.isFetching,
    stateMailSenderRecommendations: selectorGetMailSenderRecommendations(state),
    stateMailSenderNameRecommendations: selectorGetMailSenderNameRecommendations(
      state
    ),
    stateMailSubjectRecommendations: selectorGetMailSubjectRecommendations(
      state
    ),
    stateSelectedMailSenderName: state.mails.senderNames.selectedValue,
    stateSelectedMailSender: state.mails.senders.selectedValue
  };
};

const mapActionsToProps = {
  actionCreateNewMailSenderNameAndReFetch,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionSetSelectedMailSender,
  actionSetSelectedMailSenderName
};

export const MailsStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
