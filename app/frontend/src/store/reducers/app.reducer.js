import {
  APP_AJAX_REQUEST_START,
  APP_AJAX_REQUEST_SUCCESS,
  APP_AJAX_REQUEST_FAIL
} from '../constants';

const initialState = {
  ajaxRequestInProgress: false,
  errors: []
};

export default (state = initialState, { type, errors }) => {
  switch (type) {
    case APP_AJAX_REQUEST_START:
      return { ajaxRequestInProgress: true, errors: [] };

    case APP_AJAX_REQUEST_SUCCESS:
      return { ajaxRequestInProgress: false, errors: [] };

    case APP_AJAX_REQUEST_FAIL:
      return { ajaxRequestInProgress: false, errors };

    default:
      return state;
  }
};
