import {
  START_FETCHING_COUNTRIES,
  FINSIHED_FETCHING_COUNTRIES,
  ERRORED_FETCHING_COUNTRIES
} from './countries.constants';

const initialState = {
  isFetching: false,
  items: []
};

export const countriesReducer = (state = initialState, { type, countries }) => {
  switch (type) {
    case START_FETCHING_COUNTRIES:
      return {
        isFetching: true,
        items: []
      };
    case FINSIHED_FETCHING_COUNTRIES:
      return {
        isFetching: false,
        items: countries
      };
    case ERRORED_FETCHING_COUNTRIES:
      return {
        isFetching: false,
        items: []
      };
    default:
      return state;
  }
};
