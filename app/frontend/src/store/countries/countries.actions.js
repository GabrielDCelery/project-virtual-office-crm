import {
  START_FETCHING_COUNTRIES,
  FINSIHED_FETCHING_COUNTRIES,
  ERRORED_FETCHING_COUNTRIES
} from './countries.constants';
import services from 'services';

export const actionFindAllCountries = () => {
  return async dispatch => {
    dispatch({ type: START_FETCHING_COUNTRIES });

    const { success, payload } = await services.countries.findAll();

    if (!success) {
      return dispatch({ type: ERRORED_FETCHING_COUNTRIES });
    }

    dispatch({
      type: FINSIHED_FETCHING_COUNTRIES,
      countries: payload
    });
  };
};
