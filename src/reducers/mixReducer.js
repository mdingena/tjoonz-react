import {
  DONE_FETCHING_MIX,
  DONE_SUBMITTING_VOTE,
  PREPEND_COMMENT,
  SET_MIX,
  START_FETCHING_MIX,
  START_SUBMITTING_VOTE
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  isVoting: false,
  statusText: null,
  current: {}
};

const queryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DONE_FETCHING_MIX:
      return {
        ...state,
        isFetching: false,
        statusText: payload.statusText
      };

    case DONE_SUBMITTING_VOTE:
      return {
        ...state,
        isVoting: false,
        statusText: payload.statusText
      };

    case PREPEND_COMMENT:
      return {
        ...state,
        current: {
          ...state.current,
          comments: [payload.comment, ...state.current.comments]
        }
      };

    case SET_MIX:
      return {
        ...state,
        current: payload.result
      };

    case START_FETCHING_MIX:
      return {
        ...state,
        isFetching: true
      };

    case START_SUBMITTING_VOTE:
      return {
        ...state,
        isVoting: true
      };

    default:
      return state;
  }
};

export default queryReducer;
