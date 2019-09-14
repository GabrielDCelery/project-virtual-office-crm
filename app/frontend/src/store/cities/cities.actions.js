import {
  START_FETCHING_CITIES,
  FINSIHED_FETCHING_CITIES,
  ERRORED_FETCHING_CITIES
} from './cities.constants';
import services from 'services';

export const actionFindAllCities = () => {
  return async dispatch => {
    dispatch({ type: START_FETCHING_CITIES });

    const { success, payload } = await services.cities.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_CITIES });
    }

    dispatch({
      type: FINSIHED_FETCHING_CITIES,
      cities: payload
    });
  };
};
