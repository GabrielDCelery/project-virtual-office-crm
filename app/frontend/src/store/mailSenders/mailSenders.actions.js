import {
  ERRORED_FETCHING_MAIL_SENDERS,
  FINSIH_AJAX_REQUEST_MAIL_SENDERS,
  RESET_MAIL_SENDERS,
  RESET_SELECTED_MAIL_SENDER,
  SET_MAIL_SENDERS,
  SET_SELECTED_MAIL_SENDER,
  START_AJAX_REQUEST_MAIL_SENDERS
} from './mailSenders.constants';
import services from 'services';

export const actionSetSelectedMailSender = value => {
  return async dispatch => {
    dispatch({ type: SET_SELECTED_MAIL_SENDER, selectedValue: value });
  };
};

export const actionFindAllMailSenders = () => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_MAIL_SENDERS });
    dispatch({ type: RESET_MAIL_SENDERS });
    dispatch({ type: RESET_SELECTED_MAIL_SENDER });

    const { success, payload } = await services.mailSenders.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SENDERS });
    }

    dispatch({ type: FINSIH_AJAX_REQUEST_MAIL_SENDERS });
    dispatch({ type: SET_MAIL_SENDERS, mailSenders: payload });
  };
};
