import { TOGGLE_FACETTED_SEARCH_ITEM } from '../constants/actionTypes';
import { OR } from '../constants/facettedSearchRelations';

const initialState = {
  artists: {
    relation: OR,
    ids: []
  },
  genres: {
    relation: OR,
    ids: []
  },
  tags: {
    relation: OR,
    ids: []
  }
};

const FacettedSearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_FACETTED_SEARCH_ITEM:
      return {
        ...state,
        [payload.facet]: {
          ...state[payload.facet],
          ids: state[payload.facet].ids.includes(payload.itemId)
            ? state[payload.facet].ids.filter(id => id !== payload.itemId)
            : [payload.itemId, ...state[payload.facet].ids]
        }
      };

    default:
      return state;
  }
};

export default FacettedSearchReducer;
