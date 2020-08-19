import {
  APPEND_MY_COLLECTIONS_MIXES_RESULTS,
  DONE_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE,
  DONE_FETCHING_MY_COLLECTIONS_RESULTS,
  SET_MY_COLLECTIONS_CURRENT,
  SET_MY_COLLECTIONS_RESULTS,
  START_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE,
  START_FETCHING_MY_COLLECTIONS_RESULTS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  collections: [],
  current: {},
  mixes: [],
  statusText: null,
  nextPage: 1
};

const COLLECTIONSReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APPEND_MY_COLLECTIONS_MIXES_RESULTS:
      return {
        ...state,
        mixes: [...state.mixes, ...payload.results]
      };

    case DONE_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE:
      return {
        ...state,
        isFetching: false,
        statusText: payload.statusText,
        nextPage: payload.nextPage
      };

    case DONE_FETCHING_MY_COLLECTIONS_RESULTS:
      return {
        ...state,
        isFetching: false,
        statusText: payload.statusText
      };

    case SET_MY_COLLECTIONS_CURRENT:
      return {
        ...state,
        current: state.collections.find(({ id }) => id === payload.id) || {},
        nextPage: 1
      };

    case SET_MY_COLLECTIONS_RESULTS:
      console.log(payload.results[0]);
      return {
        ...state,
        collections: payload.results,
        current: payload.results[0] || {},
        mixes: [],
        nextPage: 1
      };

    case START_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE:
      return {
        ...state,
        isFetching: true,
        mixes: state.nextPage === 1 ? [] : state.mixes
      };

    case START_FETCHING_MY_COLLECTIONS_RESULTS:
      return {
        ...state,
        isFetching: true
      };

    default:
      return state;
  }
};

export default COLLECTIONSReducer;
