import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

import { logoutUser } from './authAction';

export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(({ data }) => dispatch({ type: GET_PROFILE, payload: data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(({ data }) => history.push('dashboard'))
    .catch(({ response }) =>
      dispatch({ type: GET_ERRORS, payload: response.data })
    );
};

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res => dispatch(logoutUser()))
      .catch(({ response }) =>
        dispatch({
          type: GET_ERRORS,
          payload: response.data
        })
      );
  }
};

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

export const clearProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`, {})
    .then(({ data }) =>
      dispatch({
        type: GET_PROFILE,
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

export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`, {})
    .then(({ data }) =>
      dispatch({
        type: GET_PROFILE,
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

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get('/api/profile/all')
    .then(({ data }) => dispatch({ type: GET_PROFILES, payload: data }))
    .catch(({ response }) =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(({ data }) => dispatch({ type: GET_PROFILE, payload: data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};
