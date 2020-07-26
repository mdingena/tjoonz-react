const selectMixFromQuery = slug => ({ query }) => query.results.find(item => item.slug === slug) || {};

export default selectMixFromQuery;
