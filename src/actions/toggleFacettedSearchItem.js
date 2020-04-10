import { TOGGLE_FACETTED_SEARCH_ITEM } from '../constants/actionTypes';

const toggleFacettedSearchItem = (facet, item) => ({
  type: TOGGLE_FACETTED_SEARCH_ITEM,
  payload: { facet, item }
});

export default toggleFacettedSearchItem;
