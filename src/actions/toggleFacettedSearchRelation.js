import { TOGGLE_FACETTED_SEARCH_RELATION } from '../constants/actionTypes';

const toggleFacettedSearchRelation = facet => ({
  type: TOGGLE_FACETTED_SEARCH_RELATION,
  payload: { facet }
});

export default toggleFacettedSearchRelation;
