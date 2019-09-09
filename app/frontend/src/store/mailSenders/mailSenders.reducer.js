import {
  START_FETCHING_MAIL_SENDERS,
  FINSIHED_FETCHING_MAIL_SENDERS,
  ERRORED_FETCHING_MAIL_SENDERS
} from './mailSenders.constants';

const initialState = {
  isFetching: false,
  items: []
};

export const mailSendersReducer = (
  state = initialState,
  { type, mailSenders }
) => {
  switch (type) {
    case START_FETCHING_MAIL_SENDERS:
      return {
        isFetching: true,
        items: []
      };
    case FINSIHED_FETCHING_MAIL_SENDERS:
      return {
        isFetching: false,
        items: mailSenders
      };
    case ERRORED_FETCHING_MAIL_SENDERS:
      return {
        isFetching: false,
        items: []
      };
    default:
      return state;
  }
};
