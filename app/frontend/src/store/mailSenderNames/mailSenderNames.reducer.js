import {
  START_FETCHING_MAIL_SENDER_NAMES,
  FINSIHED_FETCHING_MAIL_SENDER_NAMES,
  ERRORED_FETCHING_MAIL_SENDER_NAMES
} from './mailSenderNames.constants';

const initialState = {
  isFetching: false,
  items: []
};

export const mailSenderNamesReducer = (
  state = initialState,
  { type, mailSenderNames }
) => {
  switch (type) {
    case START_FETCHING_MAIL_SENDER_NAMES:
      return {
        isFetching: true,
        items: []
      };
    case FINSIHED_FETCHING_MAIL_SENDER_NAMES:
      return {
        isFetching: false,
        items: mailSenderNames
      };
    case ERRORED_FETCHING_MAIL_SENDER_NAMES:
      return {
        isFetching: false,
        items: []
      };
    default:
      return state;
  }
};
