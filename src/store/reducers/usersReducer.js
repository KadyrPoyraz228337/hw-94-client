import {
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS, FETCH_SUBSCRIPTIONS_SUCCESS, INITIAL_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS
} from "../actions/actionTypes";

const INITIAL_STATE = {
  user: null,
  subscriptions: [],
  error: null
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user};
    case LOGIN_USER_FAILURE:
      return {...state, error: action.error.response.data.message};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null};
    case EDIT_USER_SUCCESS:
      return {...state, user: action.user};
    case EDIT_USER_FAILURE:
      return {...state, error: action.error.response.data.message};
    case INITIAL_USER_SUCCESS:
      return {...state, error: null};
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return {...state, subscriptions: action.subscriptions};
    default: return state
  }
};

export default usersReducer;