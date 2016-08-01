import axios from 'axios';
import { push } from 'react-router-redux';
import { API_URL } from '../config/constants';
import {
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILURE,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILURE,
  USER_SIGN_OUT
} from './actionTypes';

export const userSignUp = ({email, username, password}) => (dispatch) => {
  // TODO: show spinner
  return axios.post(`${API_URL}/users/signup`, {
    email,
    username,
    password,
  })
  .then(({data}) => {
    dispatch({
      type: USER_SIGN_UP_SUCCESS,
      payload: data.user,
    });
    dispatch(push('/'));
  })
  .catch(response => {
    console.log('Signup failed', response);
    dispatch({
      type: USER_SIGN_UP_FAILURE,
    })
  });
}

export const userSignIn = (credentials) => (dispatch) => {
  // TODO: show spinner
  return axios({
    method: 'post',
    url: `${API_URL}/users/signin`,
    data: {
      email: credentials.email,
      password: credentials.password,
    }
  })
  .then(({data}) => {
    console.log('successfully signed in', data);
    dispatch({
      type: USER_SIGN_IN_SUCCESS,
      payload: data.user,
    });

    dispatch(push('/'));
  })
  .catch(response => {
    console.log('signin failed', response);
    dispatch({
      type: USER_SIGN_IN_FAILURE,
    })
  });
};

export const userSignOut = () => ({
  type: USER_SIGN_OUT,
});
