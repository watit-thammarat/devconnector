import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERROR
} from './types';

export const addPost = postData => dispatch => {
  dispatch(clearError());
  axios
    .post('/api/posts', postData)
    .then(({ data }) =>
      dispatch({
        type: ADD_POST,
        payload: data
      })
    )
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearError());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(({ data }) => dispatch({ type: GET_POST, payload: data }))
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(({ data }) => dispatch({ type: GET_POST, payload: data }))
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(({ data }) => dispatch({ type: GET_POSTS, payload: data }))
    .catch(({ response }) =>
      dispatch({
        type: GET_POSTS,
        payload: []
      })
    );
};

export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(({ data }) => dispatch({ type: GET_POST, payload: data }))
    .catch(({ response }) =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

export const setPostLoading = () => ({ type: POST_LOADING });

export const clearError = () => ({ type: CLEAR_ERROR });

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(_ => dispatch({ type: DELETE_POST, payload: id }))
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(_ => dispatch(getPosts()))
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(_ => dispatch(getPosts()))
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};
