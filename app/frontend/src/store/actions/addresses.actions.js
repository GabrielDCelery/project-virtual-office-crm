import {
  APP_AJAX_REQUEST_START,
  APP_AJAX_REQUEST_SUCCESS,
  APP_AJAX_REQUEST_FAIL,
  ADDRESSES_FETCHED,
  ADDRESSES_RESET
} from '../constants';
import services from 'services';

const findAll = () => {
  return async dispatch => {
    dispatch({ type: ADDRESSES_RESET });
    dispatch({ type: APP_AJAX_REQUEST_START });

    const { success, errors, payload } = await services.addresses.findAll();

    if (!success) {
      return dispatch({ type: APP_AJAX_REQUEST_FAIL, errors });
    }

    dispatch({ type: ADDRESSES_FETCHED, addresses: payload });
    dispatch({ type: APP_AJAX_REQUEST_SUCCESS });
  };
}

export default {
  findAll
};