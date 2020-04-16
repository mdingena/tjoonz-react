import { isSelectedFacetItem } from '../reducers/facettedSearchReducer';

const selectIsFacettedSearchItemSelected = (facet, item) =>
  ({ facettedSearch }) =>
    isSelectedFacetItem(facettedSearch, facet, item);

export default selectIsFacettedSearchItemSelected;
