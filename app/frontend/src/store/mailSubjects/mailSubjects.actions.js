import {
  START_AJAX_REQUEST_MAIL_SUBJECTS,
  FINISH_AJAX_REQUEST_MAIL_SUBJECTS,
  ERRORED_FETCHING_MAIL_SUBJECTS,
  RESET_MAIL_SUBJECTS,
  RESET_SELECTED_MAIL_SUBJECT,
  SET_MAIL_SUBJECTS,
  SET_SELECTED_MAIL_SUBJECT
} from './mailSubjects.constants';
import services from 'services';

export const actionSetSelectedMailSubject = value => {
  return async dispatch => {
    dispatch({ type: SET_SELECTED_MAIL_SUBJECT, selectedValue: value });
  };
};

export const actionFindAllMailSubjects = () => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_MAIL_SUBJECTS });
    dispatch({ type: RESET_SELECTED_MAIL_SUBJECT });
    dispatch({ type: RESET_MAIL_SUBJECTS });

    const { success, payload } = await services.api.mailSubjects.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SUBJECTS });
    }

    dispatch({ type: FINISH_AJAX_REQUEST_MAIL_SUBJECTS });
    dispatch({ type: SET_MAIL_SUBJECTS, items: payload });
  };
};

export const actionCreateNewMailSubjectAndReFetch = mailSubject => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_MAIL_SUBJECTS });
    dispatch({ type: RESET_SELECTED_MAIL_SUBJECT });
    dispatch({ type: RESET_MAIL_SUBJECTS });

    const createResult = await services.api.mailSubjects.create({
      longSubject: mailSubject
    });

    if (!createResult.success) {
      dispatch({ type: FINISH_AJAX_REQUEST_MAIL_SUBJECTS });
      return dispatch({ type: ERRORED_FETCHING_MAIL_SUBJECTS });
    }

    const findAllResult = await services.api.mailSubjects.findAll();

    if (!findAllResult.success) {
      dispatch({ type: FINISH_AJAX_REQUEST_MAIL_SUBJECTS });
      return dispatch({ type: ERRORED_FETCHING_MAIL_SUBJECTS });
    }

    dispatch({ type: FINISH_AJAX_REQUEST_MAIL_SUBJECTS });
    dispatch({
      type: SET_MAIL_SUBJECTS,
      items: findAllResult.payload
    });
    dispatch({
      type: SET_SELECTED_MAIL_SUBJECT,
      selectedValue: {
        value: createResult.payload.id,
        label: createResult.payload.longSubject
      }
    });
  };
};
