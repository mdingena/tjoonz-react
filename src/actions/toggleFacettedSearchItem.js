import { TOGGLE_FACETTED_SEARCH_ITEM } from '../constants/actionTypes';

const toggleFacettedSearchItem = (facet, itemId) => ({
  type: TOGGLE_FACETTED_SEARCH_ITEM,
  payload: { facet, itemId }
});

export default toggleFacettedSearchItem;
