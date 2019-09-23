import {
  START_AJAX_REQUEST_MAIL_SUBJECTS,
  FINISH_AJAX_REQUEST_MAIL_SUBJECTS,
  ERRORED_FETCHING_MAIL_SUBJECTS,
  RESET_MAIL_SUBJECTS,
  RESET_SELECTED_MAIL_SUBJECT,
  SET_MAIL_SUBJECTS,
  SET_SELECTED_MAIL_SUBJECT
} from './mailSubjects.constants';

const initialState = {
  isAjaxRequestInProgress: false,
  items: [],
  selectedValue: null
};

export const mailSubjectsReducer = (
  state = initialState,
  { type, items, selectedValue }
) => {
  switch (type) {
    case START_AJAX_REQUEST_MAIL_SUBJECTS:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case FINISH_AJAX_REQUEST_MAIL_SUBJECTS:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case ERRORED_FETCHING_MAIL_SUBJECTS:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case RESET_MAIL_SUBJECTS:
      return {
        ...state,
        items: []
      };
    case SET_MAIL_SUBJECTS:
      return {
        ...state,
        items: items
      };
    case RESET_SELECTED_MAIL_SUBJECT:
      return {
        ...state,
        selectedValue: null
      };
    case SET_SELECTED_MAIL_SUBJECT:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
