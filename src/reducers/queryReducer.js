import {
  DONE_FETCHING_QUERY_RESULTS,
  SET_QUERY_RESULTS,
  START_FETCHING_QUERY_RESULTS
} from '../constants/actionTypes';
import { initialState as facettedSearchInitialState } from './facettedSearchReducer';

const reduce = state =>
  Object.entries(state)
    .reduce((newState, [facetKey, facetState]) => ({
      ...newState,
      [facetKey]: {
        relation: facetState.relation,
        ids: facetState.selected.map(({ id }) => id)
      }
    }), {});

const initialState = {
  isFetching: false,
  facets: reduce(facettedSearchInitialState),
  results: [],
  statusText: null,
  nextPage: 1
};

const queryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DONE_FETCHING_QUERY_RESULTS:
      return {
        ...state,
        isFetching: false,
        statusText: payload.statusText,
        nextPage: payload.nextPage
      };

    case SET_QUERY_RESULTS:
      return {
        ...state,
        results: payload.results
      };

    case START_FETCHING_QUERY_RESULTS:
      return {
        ...state,
        isFetching: true,
        facets: reduce(payload.facettedSearch)
      };

    default:
      return state;
  }
};

export default queryReducer;
