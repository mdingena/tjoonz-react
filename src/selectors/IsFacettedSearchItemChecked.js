export const IsFacettedSearchItemChecked = (facet, itemId) =>
  ({ facettedSearch }) =>
    facettedSearch[facet].ids.includes(itemId);
