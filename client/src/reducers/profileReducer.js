import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_LOADING:
      return { ...state, loading: true };
    case GET_PROFILE:
      return { ...state, loading: false, profile: payload };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload
      };
    case CLEAR_CURRENT_PROFILE:
      return { ...state, profile: null };
    default:
      return state;
  }
};
