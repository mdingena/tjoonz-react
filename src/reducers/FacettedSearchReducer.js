import actionTypes from '../constants/actionTypes';
import facettedSearchRelations from '../constants/facettedSearchRelations';

const initialState = {
  artists: {
    relation: facettedSearchRelations.OR,
    ids: []
  },
  genres: {
    relation: facettedSearchRelations.OR,
    ids: []
  },
  tags: {
    relation: facettedSearchRelations.OR,
    ids: []
  }
};

const FacettedSearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_FACET_SEARCH_ITEM:
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
