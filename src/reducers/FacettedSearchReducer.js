import {
  DONE_FETCHING_FACETTED_SEARCH_OPTIONS,
  SET_FACETTED_SEARCH_OPTIONS,
  START_FETCHING_FACETTED_SEARCH_OPTIONS,
  TOGGLE_FACETTED_SEARCH_ITEM
} from '../constants/actionTypes';
import { ARTISTS, GENRES, TAGS } from '../constants/facettedSearchFacets';
import { OR } from '../constants/facettedSearchRelations';

const initialState = {
  [ARTISTS.KEY]: {
    isFetching: false,
    lastUpdated: 0,
    statusText: null,
    relation: OR,
    options: [],
    selected: []
  },
  [GENRES.KEY]: {
    isFetching: false,
    lastUpdated: 0,
    statusText: null,
    relation: OR,
    options: [],
    selected: []
  },
  [TAGS.KEY]: {
    isFetching: false,
    lastUpdated: 0,
    statusText: null,
    relation: OR,
    options: [],
    selected: []
  }
};

const FacettedSearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DONE_FETCHING_FACETTED_SEARCH_OPTIONS:
      return {
        ...state,
        [payload.facet.KEY]: {
          ...state[payload.facet.KEY],
          isFetching: false,
          statusText: payload.statusText
        }
      };

    case SET_FACETTED_SEARCH_OPTIONS:
      return {
        ...state,
        [payload.facet.KEY]: {
          ...state[payload.facet.KEY],
          lastUpdated: Date.now(),
          options: orderByCountDesc(payload.options)
        }
      };

    case START_FETCHING_FACETTED_SEARCH_OPTIONS:
      return {
        ...state,
        [payload.facet.KEY]: {
          ...state[payload.facet.KEY],
          isFetching: true,
          statusText: null
        }
      };

    case TOGGLE_FACETTED_SEARCH_ITEM:
      return {
        ...state,
        [payload.facet.KEY]: {
          ...state[payload.facet.KEY],
          selected: isSelectedFacetItem(state, payload.facet, payload.item)
            ? deselectFacetItem(state, payload.facet, payload.item)
            : selectFacetItem(state, payload.facet, payload.item)
        }
      };

    default:
      return state;
  }
};

export default FacettedSearchReducer;

export const isSelectedFacetItem = (state, facet, item) =>
  state[facet.KEY].selected.some(({ id }) => id === item.id);

const deselectFacetItem = (state, facet, item) =>
  state[facet.KEY].selected.filter(({ id }) => id !== item.id);

const selectFacetItem = (state, facet, item) =>
  [item, ...state[facet.KEY].selected];

const orderByCountDesc = items =>
  [...items].sort((a, b) => b.count - a.count);
