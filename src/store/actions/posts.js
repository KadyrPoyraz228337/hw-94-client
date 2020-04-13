import {ADD_POST_FAILURE, FETCH_POST_SUCCESS, FETCH_TAGS_SUCCESS} from "./actionTypes";
import {push} from 'connected-react-router'
import axiosApi from "../../axiosConfig";


export const fetchPostsSuccess = posts => ({type: FETCH_POST_SUCCESS, posts});

export const addPostFailure = error => ({type: ADD_POST_FAILURE, error});

export const fetchTagsSuccess = tags => ({type: FETCH_TAGS_SUCCESS, tags});


export const addPost = post => async dispatch => {
  try {
    await axiosApi.post('/posts', post);
    dispatch(push('/'))
  } catch (e) {
    dispatch(addPostFailure(e))
  }
};

export const fetchPosts = () => async (dispatch, getState) => {
  try {
    if(!getState().users.user) dispatch(push('/login'));

    const resp = await axiosApi.get('/posts');

    dispatch(fetchPostsSuccess(resp.data))
  } catch (e) {
    console.log(e);
  }
};

export const fetchTags = () => async dispatch => {
  try {
    const resp = await axiosApi.get('/posts/tags');

    dispatch(fetchTagsSuccess(resp.data))
  } catch (e) {
    console.log(e);
  }
};