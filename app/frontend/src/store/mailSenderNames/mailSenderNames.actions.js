import {
  ERRORED_FETCHING_MAIL_SENDER_NAMES,
  FINISH_AJAX_REQUEST_MAIL_SENDER_NAMES,
  RESET_MAIL_SENDER_NAMES,
  RESET_SELECTED_MAIL_SENDER_NAME,
  SET_MAIL_SENDER_NAMES,
  SET_SELECTED_MAIL_SENDER_NAME,
  START_AJAX_REQUEST_MAIL_SENDER_NAMES
} from './mailSenderNames.constants';
import services from 'services';

export const actionSetSelectedMailSenderName = value => {
  return async dispatch => {
    dispatch({ type: SET_SELECTED_MAIL_SENDER_NAME, selectedValue: value });
  };
};

export const actionFindAllMailSenderNames = () => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_MAIL_SENDER_NAMES });
    dispatch({ type: RESET_SELECTED_MAIL_SENDER_NAME });
    dispatch({ type: RESET_MAIL_SENDER_NAMES });

    const { success, payload } = await services.api.mailSenderNames.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SENDER_NAMES });
    }

    dispatch({ type: FINISH_AJAX_REQUEST_MAIL_SENDER_NAMES });
    dispatch({
      type: SET_MAIL_SENDER_NAMES,
      items: payload
    });
  };
};

export const actionCreateNewMailSenderNameAndReFetch = mailSenderName => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_MAIL_SENDER_NAMES });
    dispatch({ type: RESET_SELECTED_MAIL_SENDER_NAME });
    dispatch({ type: RESET_MAIL_SENDER_NAMES });

    const createResult = await services.api.mailSenderNames.create({
      name: mailSenderName
    });

    if (!createResult.success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SENDER_NAMES });
    }

    const findAllResult = await services.api.mailSenderNames.findAll();

    if (!findAllResult.success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SENDER_NAMES });
    }

    dispatch({ type: FINISH_AJAX_REQUEST_MAIL_SENDER_NAMES });
    dispatch({
      type: SET_MAIL_SENDER_NAMES,
      items: findAllResult.payload
    });
    dispatch({
      type: SET_SELECTED_MAIL_SENDER_NAME,
      selectedValue: {
        value: createResult.payload.id,
        label: createResult.payload.name
      }
    });
  };
};
