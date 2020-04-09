const IsFacettedSearchItemChecked = (facet, itemId) =>
  ({ facettedSearch }) =>
    facettedSearch[facet].ids.includes(itemId);

export default IsFacettedSearchItemChecked;
