import { SET_CURRENT_USER } from '../actions/types';
import * as _ from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(payload),
        user: payload
      };
    default:
      return state;
  }
};
