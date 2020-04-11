import addTasks from '../actions/addTasks';
import completeTasks from '../actions/completeTasks';
import fetchPage from './fetchPage';

/**
 * Fetch all pages of a search facet.
 * @param {Function} dispatch
 * @param {Object} facet
 * @param {Object} [options] - Sets options for fetching, such as sorting and results per page.
 */
const fetchAllFacetPages = async (dispatch, facet, options = {}) => {
  dispatch(addTasks(`fetchAllFacetPages_${facet.KEY}`, 1));

  let firstPage = true;
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

      if (firstPage && pageCount > 1) dispatch(addTasks(`fetchAllFacetPages_${facet.KEY}`, pageCount - 1));

      dispatch(completeTasks(`fetchAllFacetPages_${facet.KEY}`, 1));
      firstPage = false;
    } else {
      statusText = response.statusText;
    }
  } while (ok && pageCount > page++);

  return { ok, resources, pageCount, statusText };
};

export default fetchAllFacetPages;
