import {
  MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_START_AJAX_REQUEST,
  MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_SET_LIST,
  MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_RESET_LIST,
  MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_FINISH_AJAX_REQUEST
} from './notifyEmails.constants';
import { SNACKBAR_OPEN_ERROR } from '../../../snackbar';
import services from 'services';

export const actionFindAllMailsPendingActionsNotifyEmails = () => {
  return async dispatch => {
    dispatch({ type: MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_START_AJAX_REQUEST });
    dispatch({ type: MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_RESET_LIST });

    const {
      success,
      errors,
      payload
    } = await services.api.mailsPendingActions.findAllPendingEmailNotifications();

    dispatch({ type: MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_FINISH_AJAX_REQUEST });

    if (!success) {
      dispatch({ type: SNACKBAR_OPEN_ERROR, message: errors[0] });
      return;
    }

    dispatch({
      type: MAILS_PENDING_ACTIONS_NOTIFY_EMAILS_SET_LIST,
      items: payload
    });
  };
};
