import {
  ERRORED_FETCHING_MAIL_SENDERS,
  FINSIH_AJAX_REQUEST_MAIL_SENDERS,
  RESET_MAIL_SENDERS,
  RESET_SELECTED_MAIL_SENDER,
  SET_MAIL_SENDERS,
  SET_SELECTED_MAIL_SENDER,
  START_AJAX_REQUEST_MAIL_SENDERS
} from './mailSenders.constants';

const initialState = {
  isAjaxRequestInProgress: false,
  items: [],
  selectedValue: null
};

export const mailSendersReducer = (
  state = initialState,
  { type, items, selectedValue }
) => {
  switch (type) {
    case START_AJAX_REQUEST_MAIL_SENDERS:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case FINSIH_AJAX_REQUEST_MAIL_SENDERS:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case ERRORED_FETCHING_MAIL_SENDERS:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case RESET_MAIL_SENDERS:
      return {
        ...state,
        items: []
      };
    case SET_MAIL_SENDERS:
      return {
        ...state,
        items: items
      };
    case RESET_SELECTED_MAIL_SENDER:
      return {
        ...state,
        selectedValue: null
      };
    case SET_SELECTED_MAIL_SENDER:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
