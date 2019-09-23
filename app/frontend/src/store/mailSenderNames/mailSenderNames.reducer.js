import {
  ERRORED_FETCHING_MAIL_SENDER_NAMES,
  FINISH_AJAX_REQUEST_MAIL_SENDER_NAMES,
  RESET_MAIL_SENDER_NAMES,
  RESET_SELECTED_MAIL_SENDER_NAME,
  SET_MAIL_SENDER_NAMES,
  SET_SELECTED_MAIL_SENDER_NAME,
  START_AJAX_REQUEST_MAIL_SENDER_NAMES
} from './mailSenderNames.constants';

const initialState = {
  isAjaxRequestInProgress: false,
  items: [],
  selectedValue: null
};

export const mailSenderNamesReducer = (
  state = initialState,
  { type, items, selectedValue }
) => {
  switch (type) {
    case START_AJAX_REQUEST_MAIL_SENDER_NAMES:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case FINISH_AJAX_REQUEST_MAIL_SENDER_NAMES:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case ERRORED_FETCHING_MAIL_SENDER_NAMES:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case RESET_MAIL_SENDER_NAMES:
      return {
        ...state,
        items: []
      };
    case SET_MAIL_SENDER_NAMES:
      return {
        ...state,
        items
      };
    case RESET_SELECTED_MAIL_SENDER_NAME: {
      return {
        ...state,
        selectedValue: null
      };
    }
    case SET_SELECTED_MAIL_SENDER_NAME:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
