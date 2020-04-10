import { TOGGLE_FACETTED_SEARCH_ITEM } from '../constants/actionTypes';
import { ARTISTS, GENRES, TAGS } from '../constants/facettedSearchFacets';
import { OR } from '../constants/facettedSearchRelations';

const now = Date.now();

const initialState = {
  [ARTISTS.KEY]: {
    isFetching: false,
    lastUpdated: now,
    relation: OR,
    options: [],
    selected: []
  },
  [GENRES.KEY]: {
    isFetching: false,
    lastUpdated: now,
    relation: OR,
    options: [],
    selected: []
  },
  [TAGS.KEY]: {
    isFetching: false,
    lastUpdated: now,
    relation: OR,
    options: [],
    selected: []
  }
};

const FacettedSearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
