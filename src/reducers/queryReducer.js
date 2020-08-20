import {
  APPEND_MY_COLLECTIONS_MIXES_RESULTS,
  APPEND_QUERY_RESULTS,
  DONE_FETCHING_NEXT_QUERY_RESULTS_PAGE,
  DONE_FETCHING_QUERY_RESULTS,
  SET_QUERY_RESULTS,
  START_FETCHING_NEXT_QUERY_RESULTS_PAGE,
  START_FETCHING_QUERY_RESULTS,
  UPSERT_MIX_IN_QUERY_RESULTS
} from '../constants/actionTypes';
import { initialState as facettedSearchInitialState } from './facettedSearchReducer';

const reduce = state =>
  Object.entries(state).reduce(
    (newState, [facetKey, facetState]) => ({
      ...newState,
      [facetKey]: {
        relation: facetState.relation,
        ids: facetState.selected.map(({ id }) => id)
      }
    }),
    {}
  );

const initialState = {
  isFetching: false,
  facets: reduce(facettedSearchInitialState),
  results: [],
  statusText: null,
  nextPage: 1
};

const queryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APPEND_MY_COLLECTIONS_MIXES_RESULTS:
    case APPEND_QUERY_RESULTS:
      return {
        ...state,
        results: [
          ...state.results,
          ...payload.results.filter(result => state.results.every(({ id }) => id !== result.id))
        ]
      };

    case DONE_FETCHING_NEXT_QUERY_RESULTS_PAGE:
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

    case START_FETCHING_NEXT_QUERY_RESULTS_PAGE:
      return {
        ...state,
        isFetching: true
      };

    case START_FETCHING_QUERY_RESULTS:
      return {
        ...state,
        isFetching: true,
        facets: reduce(payload.facettedSearch)
      };

    case UPSERT_MIX_IN_QUERY_RESULTS:
      const update = state.results.findIndex(mix => mix.id === payload.mix.id);

      return {
        ...state,
        results: update
          ? [...state.results.slice(0, update), payload.mix, ...state.results.slice(update + 1)]
          : [...state.results, payload.mix]
      };

    default:
      return state;
  }
};

export default queryReducer;
