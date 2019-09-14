import {
  START_FETCHING_MAIL_SENDER_NAMES,
  FINSIHED_FETCHING_MAIL_SENDER_NAMES,
  ERRORED_FETCHING_MAIL_SENDER_NAMES
} from './mailSenderNames.constants';
import services from 'services';

export const actionFindAllMailSenderNames = () => {
  return async dispatch => {
    dispatch({ type: START_FETCHING_MAIL_SENDER_NAMES });

    const { success, payload } = await services.mailSenderNames.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SENDER_NAMES });
    }

    dispatch({
      type: FINSIHED_FETCHING_MAIL_SENDER_NAMES,
      mailSenderNames: payload
    });
  };
};
