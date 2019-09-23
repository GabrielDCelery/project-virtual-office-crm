import {
  ERRORED_FETCHING_COUNTRIES,
  FINISH_AJAX_REQUEST_COUNTRIES,
  RESET_COUNTRIES,
  RESET_SELECTED_COUNTRY,
  SET_COUNTRIES,
  SET_SELECTED_COUNTRY,
  START_AJAX_REQUEST_COUNTRIES
} from './countries.constants';
import services from 'services';

export const actionSetSelectedCountry = value => {
  return async dispatch => {
    dispatch({ type: SET_SELECTED_COUNTRY, selectedValue: value });
  };
};

export const actionFindAllCountries = () => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_COUNTRIES });
    dispatch({ type: RESET_SELECTED_COUNTRY });
    dispatch({ type: RESET_COUNTRIES });

    const { success, payload } = await services.countries.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_COUNTRIES });
    }

    dispatch({ type: FINISH_AJAX_REQUEST_COUNTRIES });
    dispatch({
      type: SET_COUNTRIES,
      items: payload
    });
  };
};
