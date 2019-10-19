import {
  MAIL_SUBJECTS_START_AJAX_REQUEST,
  MAIL_SUBJECTS_FINISH_AJAX_REQUEST,
  MAIL_SUBJECTS_RESET_LIST,
  MAIL_SUBJECTS_RESET_SELECTED,
  MAIL_SUBJECTS_SET_LIST,
  MAIL_SUBJECTS_SET_SELECTED
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
    case MAIL_SUBJECTS_START_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case MAIL_SUBJECTS_FINISH_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case MAIL_SUBJECTS_RESET_LIST:
      return {
        ...state,
        items: []
      };
    case MAIL_SUBJECTS_SET_LIST:
      return {
        ...state,
        items: items
      };
    case MAIL_SUBJECTS_RESET_SELECTED:
      return {
        ...state,
        selectedValue: null
      };
    case MAIL_SUBJECTS_SET_SELECTED:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
