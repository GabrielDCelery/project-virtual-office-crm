import {
  MAIL_CREATE_FORM_START_AJAX_REQUEST,
  MAIL_CREATE_FORM_FINISH_AJAX_REQUEST
} from './mailCreateForm.constants';
import { SNACKBAR_OPEN_SUCCESS, SNACKBAR_OPEN_ERROR } from '../../snackbar';
import services from 'services';

export const actionCreateNewMail = formData => {
  return async dispatch => {
    dispatch({ type: MAIL_CREATE_FORM_START_AJAX_REQUEST });

    const { success, errors } = await services.api.mails.create(formData);

    dispatch({ type: MAIL_CREATE_FORM_FINISH_AJAX_REQUEST });

    if (!success) {
      dispatch({ type: SNACKBAR_OPEN_ERROR, message: errors[0] });
      return;
    }

    dispatch({
      type: SNACKBAR_OPEN_SUCCESS,
      message: 'Mail successfully created!'
    });
  };
};
