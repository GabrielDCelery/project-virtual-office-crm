import {
  START_FETCHING_MAIL_SUBJECTS,
  FINSIHED_FETCHING_MAIL_SUBJECTS,
  ERRORED_FETCHING_MAIL_SUBJECTS
} from './mailSubjects.constants';

const initialState = {
  isFetching: false,
  items: []
};

export const mailSubjectsReducer = (state = initialState, { type, items }) => {
  switch (type) {
    case START_FETCHING_MAIL_SUBJECTS:
      return {
        isFetching: true,
        items: []
      };
    case FINSIHED_FETCHING_MAIL_SUBJECTS:
      return {
        isFetching: false,
        items: items
      };
    case ERRORED_FETCHING_MAIL_SUBJECTS:
      return {
        isFetching: false,
        items: []
      };
    default:
      return state;
  }
};
