import {
  START_FETCHING_MAIL_SENDERS,
  FINSIHED_FETCHING_MAIL_SENDERS,
  ERRORED_FETCHING_MAIL_SENDERS
} from './mailSenders.constants';
import services from 'services';

export const actionFindAllMailSenders = () => {
  return async dispatch => {
    dispatch({ type: START_FETCHING_MAIL_SENDERS });

    const { success, payload } = await services.mailSenders.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SENDERS });
    }

    dispatch({ type: FINSIHED_FETCHING_MAIL_SENDERS, mailSenders: payload });
  };
};
