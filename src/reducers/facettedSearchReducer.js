import qs from 'qs';
import {
  DONE_FETCHING_FACETTED_SEARCH_OPTIONS,
  SET_FACETTED_SEARCH_OPTIONS,
  START_FETCHING_FACETTED_SEARCH_OPTIONS,
  TOGGLE_FACETTED_SEARCH_ITEM,
  TOGGLE_FACETTED_SEARCH_RELATION
} from '../constants/actionTypes';
import { ARTISTS, GENRES, TAGS } from '../constants/facettedSearchFacets';
import { AND, OR } from '../constants/facettedSearchRelations';
import { checkLocalStorageAvailability } from '../utils';

const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });

const reduce = (state, query) =>
  Object.entries(state)
    .reduce((newState, [facetKey, facetState]) => {
      const notSelected = query && query[facetKey.toLowerCase()]
        ? query[facetKey.toLowerCase()]
          .split(',')
          .filter(id => facetState.selected.every(selection => selection.id !== Number(id)))
          .map(id => Number(id))
        : [];

      const notFetched = notSelected.filter(id => facetState.options.every(fetched => fetched.id !== id));
      const select = notSelected.filter(id => !notFetched.includes(id));

      return ({
        ...newState,
        [facetKey]: {
          ...state[facetKey],
          selected: [
            ...state[facetKey].selected,
            ...state[facetKey].options.filter(({ id }) => select.includes(id))
          ],
          query: notFetched
        }
      });
    }, {});

const defaultState = {
  [ARTISTS.KEY]: {
    isFetching: false,
    lastUpdated: 0,
    statusText: null,
    relation: AND,
    options: [],
    selected: [],
    query: []
  },
  [GENRES.KEY]: {
    isFetching: false,
    lastUpdated: 0,
    statusText: null,
    relation: AND,
    options: [],
    selected: [],
    query: []
  },
  [TAGS.KEY]: {
    isFetching: false,
    lastUpdated: 0,
    statusText: null,
    relation: OR,
    options: [],
    selected: [],
    query: []
  }
};

const isLocalStorageAvailable = checkLocalStorageAvailability();
const localStorage = isLocalStorageAvailable && window.localStorage.getItem('facettedSearch');

const seedState = localStorage
  ? JSON.parse(localStorage)
  : defaultState;

export const initialState = reduce(seedState, query);

const facettedSearchReducer = (state = initialState, { type, payload }) => {
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
          options: orderByCountDesc(optionsWithMixes(payload.options)),
          selected: [
            ...state[payload.facet.KEY].selected,
            ...payload.selected.filter(({ id }) => state[payload.facet.KEY].selected.every(selection => selection.id !== id))
          ],
          query: []
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
      return payload.item
        ? {
          ...state,
          [payload.facet.KEY]: {
            ...state[payload.facet.KEY],
            selected: isSelectedFacetItem(state, payload.facet, payload.item)
              ? deselectFacetItem(state, payload.facet, payload.item)
              : selectFacetItem(state, payload.facet, payload.item)
          }
        }
        : state;

    case TOGGLE_FACETTED_SEARCH_RELATION:
      return {
        ...state,
        [payload.facet.KEY]: {
          ...state[payload.facet.KEY],
          relation: state[payload.facet.KEY].relation === OR
            ? AND
            : OR
        }
      };

    default:
      return state;
  }
};

export default facettedSearchReducer;

export const isSelectedFacetItem = (state, facet, item) =>
  state[facet.KEY].selected.some(({ id }) => id === item.id);

const deselectFacetItem = (state, facet, item) =>
  state[facet.KEY].selected.filter(({ id }) => id !== item.id);

const selectFacetItem = (state, facet, item) =>
  [item, ...state[facet.KEY].selected];

const optionsWithMixes = items =>
  items.filter(item => item.count);

const orderByCountDesc = items =>
  [...items].sort((a, b) => b.count - a.count);
