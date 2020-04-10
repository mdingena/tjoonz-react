import qs from 'qs';
import { BASE_URL, ITEMS_PER_PAGE } from '../constants/api';

const defaultOptions = {
  per_page: ITEMS_PER_PAGE
};

/**
 * Fetch a page of the WP API resource at `endpoint`.
 * @param {String} endpoint - URI of the WP API resource.
 * @param {Number} page - Page number to fetch.
 * @param {Object} [options] - Sets options for fetching, such as sorting and results per page.
 */
const fetchPage = async (endpoint, page, options = {}) => {
  /* Construct a query string for fetching the resource. */
  const query = qs.stringify({ ...defaultOptions, ...options, page }, { addQueryPrefix: true });

  /* Fetch a page. */
  const response = await window.fetch(`${BASE_URL}${endpoint}${query}`);
  if (!response.ok) return response;

  /* Extract data. */
  const pageCount = response.headers.get('X-WP-TotalPages');
  const resources = await response.json();

  /* Return results. */
  return { ok: true, resources, pageCount };
};

export default fetchPage;
