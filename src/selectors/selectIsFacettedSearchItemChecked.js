const selectIsFacettedSearchItemChecked = (facet, itemId) =>
  ({ facettedSearch }) =>
    facettedSearch[facet.KEY].ids.includes(itemId);

export default selectIsFacettedSearchItemChecked;
