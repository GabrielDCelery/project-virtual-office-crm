import {
  COUNTRIES_FINISH_AJAX_REQUEST,
  COUNTRIES_RESET_LIST,
  COUNTRIES_RESET_SELECTED,
  COUNTRIES_SET_LIST,
  COUNTRIES_SET_SELECTED,
  COUNTRIES_START_AJAX_REQUEST
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
    case COUNTRIES_START_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: true
      };
    case COUNTRIES_FINISH_AJAX_REQUEST:
      return {
        ...state,
        isAjaxRequestInProgress: false
      };
    case COUNTRIES_RESET_LIST:
      return {
        ...state,
        items: []
      };
    case COUNTRIES_SET_LIST:
      return {
        ...state,
        items: items
      };
    case COUNTRIES_RESET_SELECTED: {
      return {
        ...state,
        selectedValue: null
      };
    }
    case COUNTRIES_SET_SELECTED:
      return {
        ...state,
        selectedValue: selectedValue
      };
    default:
      return state;
  }
};
