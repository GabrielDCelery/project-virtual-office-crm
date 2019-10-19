import {
  MAIL_CREATE_FORM_START_AJAX_REQUEST,
  MAIL_CREATE_FORM_FINISH_AJAX_REQUEST
} from './mailCreateForm.constants';

const initialState = {
  isAjaxRequestInProgress: false
};

export const mailCreateFormReducer = (state = initialState, { type }) => {
  switch (type) {
    case MAIL_CREATE_FORM_START_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case MAIL_CREATE_FORM_FINISH_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    default:
      return state;
  }
};
