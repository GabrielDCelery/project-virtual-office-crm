import {
  START_AJAX_REQUEST_MAIL_CREATE,
  FINISH_AJAX_REQUEST_MAIL_CREATE
} from './mailCreate.constants';

import services from 'services';

export const actionCreateNewMail = formData => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_MAIL_CREATE });

    const { success } = await services.api.mails.create(formData);

    if (!success) {
      dispatch({ type: FINISH_AJAX_REQUEST_MAIL_CREATE });
      return;
    }

    dispatch({ type: FINISH_AJAX_REQUEST_MAIL_CREATE });
  };
};
