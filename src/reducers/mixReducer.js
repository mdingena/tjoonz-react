import {
  DONE_FETCHING_MIX,
  PREPEND_COMMENT,
  SET_MIX,
  START_FETCHING_MIX
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
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

    case PREPEND_COMMENT:
      return {
        ...state,
        current: {
          ...state.current,
          comments: [
            payload.comment,
            ...state.current.comments
          ]
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

    default:
      return state;
  }
};

export default queryReducer;
