import {
  ERRORED_FETCHING_CITIES,
  FINISH_AJAX_REQUEST_CITIES,
  RESET_CITIES,
  RESET_SELECTED_CITY,
  SET_CITIES,
  SET_SELECTED_CITY,
  START_AJAX_REQUEST_CITIES
} from './cities.constants';

const initialState = {
  isAjaxRequestInProgress: false,
  items: [],
  selectedValue: null
};

export const citiesReducer = (
  state = initialState,
  { type, items, selectedValue }
) => {
  switch (type) {
    case START_AJAX_REQUEST_CITIES:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case FINISH_AJAX_REQUEST_CITIES:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case ERRORED_FETCHING_CITIES:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case RESET_CITIES:
      return {
        ...state,
        items: []
      };
    case SET_CITIES:
      return {
        ...state,
        items: items
      };
    case RESET_SELECTED_CITY: {
      return {
        ...state,
        selectedValue: null
      };
    }
    case SET_SELECTED_CITY:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
