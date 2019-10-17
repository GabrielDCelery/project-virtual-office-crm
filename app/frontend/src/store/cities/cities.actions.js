import {
  ERRORED_FETCHING_CITIES,
  FINISH_AJAX_REQUEST_CITIES,
  RESET_CITIES,
  RESET_SELECTED_CITY,
  SET_CITIES,
  SET_SELECTED_CITY,
  START_AJAX_REQUEST_CITIES
} from './cities.constants';
import services from 'services';

export const actionSetSelectedCity = value => {
  return async dispatch => {
    dispatch({ type: SET_SELECTED_CITY, selectedValue: value });
  };
};

export const actionFindAllCities = () => {
  return async dispatch => {
    dispatch({ type: START_AJAX_REQUEST_CITIES });
    dispatch({ type: RESET_SELECTED_CITY });
    dispatch({ type: RESET_CITIES });

    const { success, payload } = await services.api.cities.findAll();

    if (!success) {
      dispatch({ type: FINISH_AJAX_REQUEST_CITIES });
      return dispatch({ type: ERRORED_FETCHING_CITIES });
    }

    dispatch({ type: FINISH_AJAX_REQUEST_CITIES });
    dispatch({
      type: SET_CITIES,
      items: payload
    });
  };
};
