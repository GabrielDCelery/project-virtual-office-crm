import {
  START_AJAX_REQUEST_MAIL_CREATE,
  FINISH_AJAX_REQUEST_MAIL_CREATE
} from './mailCreate.constants';

import services from 'services';

export const actionCreateNewMail = ({
  document,
  file,
  receiver,
  sender,
  subject
}) => {
  return async dispatch => {
    const formData = new FormData();

    formData.append('document', document);
    formData.append('file', file, file.name);
    formData.append('receiver', receiver);
    formData.append('sender', sender);
    formData.append('subject', subject);

    dispatch({ type: START_AJAX_REQUEST_MAIL_CREATE });

    const { success } = await services.api.mails.create(formData);

    if (!success) {
      dispatch({ type: FINISH_AJAX_REQUEST_MAIL_CREATE });
      return;
    }

    dispatch({ type: FINISH_AJAX_REQUEST_MAIL_CREATE });
  };
};
