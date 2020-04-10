import fetchPage from './fetchPage';

/**
 * Fetch all pages of a search facet.
 * @param {Object} facet
 * @param {Object} [options] - Sets options for fetching, such as sorting and results per page.
 */
const fetchAllFacetPages = async (facet, options = {}) => {
  let ok = true;
  let page = 1;
  let pageCount = 0;
  let resources = [];
  let statusText = null;

  do {
    const response = await fetchPage(facet.ENDPOINT, page, options);
    ok = response.ok;

    if (ok) {
      pageCount = response.pageCount;
      resources = [...resources, ...response.resources];
    } else {
      statusText = response.statusText;
    }
  } while (ok && pageCount > page++);

  return { ok, resources, pageCount, statusText };
};

export default fetchAllFacetPages;
