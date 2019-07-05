import {
  ADDRESSES_FETCHED,
  ADDRESSES_RESET
} from '../constants';

const initialState = {
  addresses: []
};

export default (state = initialState, { type, addresses }) => {
  switch (type) {
    case ADDRESSES_RESET:
      return { addresses: [] }

    case ADDRESSES_FETCHED:
      return {
        ...state,
        ...{ addresses }
      };

    default:
      return state;
  }
}
