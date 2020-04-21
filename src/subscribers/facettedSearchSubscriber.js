import store from '../store';
import updateQuery from '../actions/updateQuery';

export default () => {
  const { facettedSearch, query } = store.getState();

  if (!query.isFetching) {
    const isFetching = Object.values(facettedSearch).some(({ isFetching }) => isFetching);

    if (!isFetching) {
      /* Check if the selected facetted search options are different from the current query. */
      const isStale = Object.entries(facettedSearch)
        .some(([facetKey, { relation, selected }]) =>
          relation !== query.facets[facetKey].relation ||
          selected.length !== query.facets[facetKey].ids.length ||
          !selected.every(({ id }) => query.facets[facetKey].ids.includes(id))
        );

      if (isStale) {
        /* Update query state and fetch new results. */
        const action = updateQuery(facettedSearch);
        store.dispatch(action);
      }
    }
  }
};
