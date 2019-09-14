import {
  START_FETCHING_CITIES,
  FINSIHED_FETCHING_CITIES,
  ERRORED_FETCHING_CITIES
} from './cities.constants';

const initialState = {
  isFetching: false,
  items: []
};

export const citiesReducer = (state = initialState, { type, cities }) => {
  switch (type) {
    case START_FETCHING_CITIES:
      return {
        isFetching: true,
        items: []
      };
    case FINSIHED_FETCHING_CITIES:
      return {
        isFetching: false,
        items: cities
      };
    case ERRORED_FETCHING_CITIES:
      return {
        isFetching: false,
        items: []
      };
    default:
      return state;
  }
};
