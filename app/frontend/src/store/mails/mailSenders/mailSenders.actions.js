import {
  MAIL_SENDERS_FINISH_AJAX_REQUEST,
  MAIL_SENDERS_RESET_LIST,
  MAIL_SENDERS_RESET_SELECTED,
  MAIL_SENDERS_SET_LIST,
  MAIL_SENDERS_SET_SELECTED,
  MAIL_SENDERS_START_AJAX_REQUEST
} from './mailSenders.constants';
import { SNACKBAR_OPEN_ERROR } from '../../snackbar';
import services from 'services';

export const actionSetSelectedMailSender = value => {
  return async dispatch => {
    dispatch({ type: MAIL_SENDERS_SET_SELECTED, selectedValue: value });
  };
};

export const actionFindAllMailSenders = () => {
  return async dispatch => {
    dispatch({ type: MAIL_SENDERS_START_AJAX_REQUEST });
    dispatch({ type: MAIL_SENDERS_RESET_LIST });
    dispatch({ type: MAIL_SENDERS_RESET_SELECTED });

    const {
      success,
      errors,
      payload
    } = await services.api.mailSenders.findAll();

    dispatch({ type: MAIL_SENDERS_FINISH_AJAX_REQUEST });

    if (!success) {
      dispatch({ type: SNACKBAR_OPEN_ERROR, message: errors[0] });
      return;
    }

    dispatch({ type: MAIL_SENDERS_SET_LIST, items: payload });
  };
};
