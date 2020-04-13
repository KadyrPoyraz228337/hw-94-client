import {ADD_POST_FAILURE, FETCH_POST_SUCCESS, FETCH_TAGS_SUCCESS} from "../actions/actionTypes";

const INITIAL_STATE = {
  posts: [],
  error: null,
  tags: []
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      return {...state, posts: action.posts};
    case ADD_POST_FAILURE:
      return {...state, error: action.error.response.data.message};
    case FETCH_TAGS_SUCCESS:
      return {...state, tags: action.tags};
    default: return state
  }
};

export default postsReducer;