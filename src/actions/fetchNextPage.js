import {
  APPEND_QUERY_RESULTS,
  DONE_FETCHING_NEXT_QUERY_RESULTS_PAGE,
  START_FETCHING_NEXT_QUERY_RESULTS_PAGE
} from '../constants/actionTypes';
import { ENDPOINTS } from '../constants/api';
import { ARTISTS, GENRES, TAGS } from '../constants/facettedSearchFacets';
import addTasks from '../actions/addTasks';
import completeTasks from '../actions/completeTasks';
import fetchPage from '../api/fetchPage';
import extractMixData from '../api/extractMixData';

const fetchNextPage = () => async (dispatch, getState) => {
  dispatch(startFetching);
  dispatch(addTasks(APPEND_QUERY_RESULTS, 1));

  const { query } = getState();

  if (!query.nextPage) {
    dispatch(doneFetching(null, 'There are no more results.'));
    dispatch(completeTasks(APPEND_QUERY_RESULTS, 1));
    return;
  }

  const options = { _embed: true };

  if (query.facets[ARTISTS.KEY].ids.length > 0) options[ARTISTS.TAXONOMY] = query.facets[ARTISTS.KEY].ids.join(',');
  if (query.facets[GENRES.KEY].ids.length > 0) options[GENRES.TAXONOMY] = query.facets[GENRES.KEY].ids.join(',');
  if (query.facets[TAGS.KEY].ids.length > 0) options[TAGS.TAXONOMY] = query.facets[TAGS.KEY].ids.join(',');

  const response = await fetchPage(ENDPOINTS.MIXES, query.nextPage, options);

  if (!response.ok) {
    dispatch(doneFetching(null, response.statusText));
    dispatch(completeTasks(APPEND_QUERY_RESULTS, 1));
    return;
  }

  const mixes = response.resources.map(extractMixData);

  dispatch(appendQueryResults(mixes));

  const nextPage = response.pageCount > query.nextPage ? query.nextPage + 1 : null;

  dispatch(doneFetching(nextPage));
  dispatch(completeTasks(APPEND_QUERY_RESULTS, 1));
};

export default fetchNextPage;

const startFetching = {
  type: START_FETCHING_NEXT_QUERY_RESULTS_PAGE
};

const doneFetching = (nextPage, statusText = null) => ({
  type: DONE_FETCHING_NEXT_QUERY_RESULTS_PAGE,
  payload: { nextPage, statusText }
});

const appendQueryResults = results => ({
  type: APPEND_QUERY_RESULTS,
  payload: { results }
});
