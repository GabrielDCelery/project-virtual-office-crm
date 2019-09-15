import {
  START_FETCHING_MAIL_SUBJECTS,
  FINSIHED_FETCHING_MAIL_SUBJECTS,
  ERRORED_FETCHING_MAIL_SUBJECTS
} from './mailSubjects.constants';
import services from 'services';

export const actionFindAllMailSubjects = () => {
  return async dispatch => {
    dispatch({ type: START_FETCHING_MAIL_SUBJECTS });

    const { success, payload } = await services.mailSubjects.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_MAIL_SUBJECTS });
    }

    dispatch({
      type: FINSIHED_FETCHING_MAIL_SUBJECTS,
      mailSubjects: payload
    });
  };
};
