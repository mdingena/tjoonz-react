import actionTypes from '../constants/actionTypes';

const toggleFacettedSearchItem = (facet, itemId) => ({
  type: actionTypes.TOGGLE_FACET_SEARCH_ITEM,
  payload: { facet, itemId }
});

export default toggleFacettedSearchItem;
