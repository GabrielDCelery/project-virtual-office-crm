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
    actionCreateNewMail,
    actionCreateNewMailSenderNameAndReFetch,
    actionCreateNewMailSubjectAndReFetch,
    actionFindAllMailSenderNames,
    actionFindAllMailSenders,
    actionFindAllMailSubjects,
    actionSetSelectedMailSender,
    actionSetSelectedMailSenderName,
    actionSetSelectedMailSubject
  }
} = store;

const mapStateToProps = state => {
  return {
    stateIsCreateNewMailAjaxRequestInProgress:
      state.mails.createForm.isAjaxRequestInProgress,
    stateIsMailSendersAjaxRequestInProgress:
      state.mails.senders.isAjaxRequestInProgress,
    stateIsMailSenderNamesAjaxRequestInProgress:
      state.mails.senderNames.isAjaxRequestInProgress,
    stateIsFetchingMailSubjects: state.mails.subjects.isAjaxRequestInProgress,
    stateMailSenderRecommendations: selectorGetMailSenderRecommendations(state),
    stateMailSenderNameRecommendations: selectorGetMailSenderNameRecommendations(
      state
    ),
    stateMailSubjectRecommendations: selectorGetMailSubjectRecommendations(
      state
    ),
    stateSelectedMailSenderName: state.mails.senderNames.selectedValue,
    stateSelectedMailSender: state.mails.senders.selectedValue,
    stateSelectedMailSubject: state.mails.subjects.selectedValue
  };
};

const mapActionsToProps = {
  actionCreateNewMail,
  actionCreateNewMailSenderNameAndReFetch,
  actionCreateNewMailSubjectAndReFetch,
  actionFindAllMailSenderNames,
  actionFindAllMailSenders,
  actionFindAllMailSubjects,
  actionSetSelectedMailSender,
  actionSetSelectedMailSenderName,
  actionSetSelectedMailSubject
};

export const MailsStoreDecorator = ToWrapComponent => {
  return connect(
    mapStateToProps,
    mapActionsToProps
  )(props => <ToWrapComponent {...props} />);
};
