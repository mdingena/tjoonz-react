import { TOGGLE_FACETTED_SEARCH_ITEM } from '../constants/actionTypes';
import { ARTISTS, GENRES, TAGS } from '../constants/facettedSearchFacets';
import { OR } from '../constants/facettedSearchRelations';

const initialState = {
  [ARTISTS.KEY]: {
    relation: OR,
    ids: []
  },
  [GENRES.KEY]: {
    relation: OR,
    ids: []
  },
  [TAGS.KEY]: {
    relation: OR,
    ids: []
  }
};

const FacettedSearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_FACETTED_SEARCH_ITEM:
      return {
        ...state,
        [payload.facet.KEY]: {
          ...state[payload.facet.KEY],
          ids: state[payload.facet.KEY].ids.includes(payload.itemId)
            ? state[payload.facet.KEY].ids.filter(id => id !== payload.itemId)
            : [payload.itemId, ...state[payload.facet.KEY].ids]
        }
      };

    default:
      return state;
  }
};

export default FacettedSearchReducer;
