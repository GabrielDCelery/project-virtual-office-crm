import {
  ERRORED_FETCHING_COUNTRIES,
  FINISH_AJAX_REQUEST_COUNTRIES,
  RESET_COUNTRIES,
  RESET_SELECTED_COUNTRY,
  SET_COUNTRIES,
  SET_SELECTED_COUNTRY,
  START_AJAX_REQUEST_COUNTRIES
} from './countries.constants';

const initialState = {
  isAjaxRequestInProgress: false,
  items: [],
  selectedValue: null
};

export const countriesReducer = (
  state = initialState,
  { type, items, selectedValue }
) => {
  switch (type) {
    case START_AJAX_REQUEST_COUNTRIES:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case FINISH_AJAX_REQUEST_COUNTRIES:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case ERRORED_FETCHING_COUNTRIES:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case RESET_COUNTRIES:
      return {
        ...state,
        items: []
      };
    case SET_COUNTRIES:
      return {
        ...state,
        items: items
      };
    case RESET_SELECTED_COUNTRY: {
      return {
        ...state,
        selectedValue: null
      };
    }
    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
