import actionTypes from '../constants/actionTypes';

export const toggleFacettedSearchItem = (facet, itemId) => ({
  type: actionTypes.TOGGLE_FACET_SEARCH_ITEM,
  facet,
  itemId
});
