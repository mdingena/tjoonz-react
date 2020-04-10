import fetchPage from './fetchPage';

/**
 * Fetch all pages of the WP API resource at `endpoint`.
 * @param {String} endpoint - URI of the WP API resource.
 * @param {Object} [options] - Sets options for fetching, such as sorting and results per page.
 */
const fetchAllPages = async (endpoint, options = {}) => {
  let ok = true;
  let page = 1;
  let pageCount = 1;
  let resources = [];

  do {
    const response = await fetchPage(endpoint, page, options);
    ok = response.ok;

    if (ok) {
      pageCount = response.pageCount;
      resources = [...resources, response.resources];
    }
  } while (ok && pageCount > page++);

  return { ok, resources, pageCount };
};

export default fetchAllPages;
