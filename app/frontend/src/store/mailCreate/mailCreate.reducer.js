import {
  START_AJAX_REQUEST_MAIL_CREATE,
  FINISH_AJAX_REQUEST_MAIL_CREATE
} from './mailCreate.constants';

const initialState = {
  isAjaxRequestInProgress: false
};

export const mailCreateReducer = (state = initialState, { type }) => {
  switch (type) {
    case START_AJAX_REQUEST_MAIL_CREATE:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case FINISH_AJAX_REQUEST_MAIL_CREATE:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    default:
      return state;
  }
};
