import { DONE_SIGNING_IN, SET_AUTH, START_SIGNING_IN, UNSET_AUTH } from '../constants/actionTypes';
import { recallAuth } from '../api/authentication';

const storedState = recallAuth();

const defaultState = {
  isAuthenticating: false,
  token: '',
  user_email: '',
  user_nicename: '',
  user_display_name: '',
  statusText: null
};

const initialState = storedState || defaultState;

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DONE_SIGNING_IN:
      return {
        ...state,
        isAuthenticating: false,
        statusText: payload.statusText
      };

    case SET_AUTH:
      return {
        ...state,
        ...payload.auth
      };

    case START_SIGNING_IN:
      return {
        ...state,
        isAuthenticating: true,
        statusText: null
      };

    case UNSET_AUTH:
      return defaultState;

    default:
      return state;
  }
};

export default authReducer;
