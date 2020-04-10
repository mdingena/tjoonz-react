import { isSelectedFacetItem } from '../reducers/FacettedSearchReducer';

const selectIsFacettedSearchItemSelected = (facet, item) =>
  ({ facettedSearch }) =>
    isSelectedFacetItem(facettedSearch, facet, item);

export default selectIsFacettedSearchItemSelected;
