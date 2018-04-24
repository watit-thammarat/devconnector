import {
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POST:
      return { ...state, posts: [payload, ...state.posts] };
    case POST_LOADING:
      return { ...state, loading: true };
    case GET_POSTS:
      return { ...state, loading: false, posts: payload };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p._id !== payload)
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    default:
      return state;
  }
};
