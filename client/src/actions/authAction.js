import axios from 'axios';
import jwtDecode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
    })
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(({ data }) => {
      const { token } = data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decodedUserData = jwtDecode(token);
      dispatch(setCurrentUser(decodedUserData));
      history.push('/dashboard');
    })
    .catch(({ response }) =>
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      })
    );
};

export const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData
});

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(null);
  dispatch(setCurrentUser({}));
};
