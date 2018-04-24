import { GET_ERRORS, CLEAR_ERROR } from '../actions/types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      return payload;
    case CLEAR_ERROR:
      return {};
    default:
      return state;
  }
};
