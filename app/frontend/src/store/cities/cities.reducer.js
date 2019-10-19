import {
  CITIES_FINISH_AJAX_REQUEST,
  CITIES_RESET_LIST,
  CITIES_RESET_SELECTED,
  CITIES_SET_LIST,
  CITIES_SET_SELECTED,
  CITIES_START_AJAX_REQUEST
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
    case CITIES_START_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case CITIES_FINISH_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case CITIES_RESET_LIST:
      return {
        ...state,
        items: []
      };
    case CITIES_SET_LIST:
      return {
        ...state,
        items: items
      };
    case CITIES_RESET_SELECTED: {
      return {
        ...state,
        selectedValue: null
      };
    }
    case CITIES_SET_SELECTED:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
