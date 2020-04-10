const selectIsFacettedSearchItemChecked = (facet, itemId) =>
  ({ facettedSearch }) =>
    facettedSearch[facet].ids.includes(itemId);

export default selectIsFacettedSearchItemChecked;
