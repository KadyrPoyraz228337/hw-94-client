import axiosApi from "../../axiosConfig";
import {push} from 'connected-react-router';
import {
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  INITIAL_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS
} from "./actionTypes";
import {fetchPosts} from "./posts";

export const initialUserSuccess = () => ({type: INITIAL_USER_SUCCESS});

export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const editUserSuccess = user => ({type: EDIT_USER_SUCCESS, user});
export const editUserFailure = error => ({type: EDIT_USER_FAILURE, error});

export const fetchSubscriptionsSuccess = subscriptions => ({type: FETCH_SUBSCRIPTIONS_SUCCESS, subscriptions});


export const registerUser = user => async dispatch => {
  try {
    const res = await axiosApi.post('/users', user);
    dispatch(loginUserSuccess(res.data));
    dispatch(push('/'));
  } catch (e) {
    console.log(e);
    dispatch(loginUserFailure(e));
  }
};

export const loginUser = user => async dispatch => {
  try {
    const resp = await axiosApi.post('/users/sessions', user);
    dispatch(loginUserSuccess(resp.data));
    dispatch(push('/'));
  } catch (e) {
    dispatch(loginUserFailure(e))
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await axiosApi.delete('/users/sessions');
    dispatch(push('/login'));
    dispatch(logoutUserSuccess());
  } catch (e) {
    dispatch(push('/login'));
  }
};

export const facebookLogin = data => async dispatch => {
  try {
    const resp = await axiosApi.post('/users/facebook', data);
    dispatch(loginUserSuccess(resp.data));
    dispatch(push('/'))
  } catch (e) {
    console.log(e);
  }
};

export const editUser = user => async dispatch => {
  try {
    const resp = await axiosApi.put('/users/edit', user);

    dispatch(editUserSuccess(resp.data));
    dispatch(push('/profile'))
  } catch (e) {
    dispatch(editUserFailure(e))
  }
};

export const fetchSubscriptions = () => async dispatch => {
  try {
    const resp = await axiosApi.get('/users/subscriptions');

    dispatch(fetchSubscriptionsSuccess(resp.data))
  } catch (e) {
    console.log(e);
  }
};

export const subscribeUser = user => async dispatch => {
  try {
    await axiosApi.post('/users/subscribe', {user: user});
    dispatch(push('/'));
    dispatch(fetchPosts())
  } catch (e) {
    console.log(e);
  }
};

export const unsubscribeFromUser = user => async dispatch => {
  try {
    await axiosApi.post('/users/unsubscribe', {user: user});
    dispatch(fetchSubscriptions())
  } catch (e) {
    console.log(e);
  }
};