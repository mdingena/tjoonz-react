import actionTypes from '../constants/actionTypes';
import facettedSearchRelations from '../constants/facettedSearchRelations';

const initialState = {
  artist: {
    relation: facettedSearchRelations.OR,
    ids: []
  },
  genre: {
    relation: facettedSearchRelations.OR,
    ids: []
  },
  tags: {
    relation: facettedSearchRelations.OR,
    ids: []
  }
};

export const FacettedSearchReducer = (state = initialState, { type, facet, itemId }) => {
  switch (type) {
    case actionTypes.TOGGLE_FACET_SEARCH_ITEM:
      return {
        ...state,
        [facet]: {
          ...state[facet],
          ids: state[facet].ids.includes(itemId)
            ? state[facet].ids.filter(id => id !== itemId)
            : state[facet].ids.concat(itemId)
        }
      };

    default:
      return state;
  }
};
