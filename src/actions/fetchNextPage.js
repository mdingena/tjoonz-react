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

  const { query, facettedSearch } = getState();

  if (!query.nextPage) {
    dispatch(doneFetching(null, 'There are no more results.'));
    dispatch(completeTasks(APPEND_QUERY_RESULTS, 1));
    return;
  }

  const ids = {
    [ARTISTS.TAXONOMY]: query.facets[ARTISTS.KEY].ids > 0 ? query.facets[ARTISTS.KEY].ids : [],
    [GENRES.TAXONOMY]: query.facets[GENRES.KEY].ids > 0 ? query.facets[GENRES.KEY].ids : [],
    [TAGS.TAXONOMY]: query.facets[TAGS.KEY].ids > 0 ? query.facets[TAGS.KEY].ids : []
  };

  if (facettedSearch[ARTISTS.KEY].query.length > 0) ids[ARTISTS.TAXONOMY].push(...facettedSearch[ARTISTS.KEY].query);
  if (facettedSearch[GENRES.KEY].query.length > 0) ids[GENRES.TAXONOMY].push(...facettedSearch[GENRES.KEY].query);
  if (facettedSearch[TAGS.KEY].query.length > 0) ids[TAGS.TAXONOMY].push(...facettedSearch[TAGS.KEY].query);

  const options = { _embed: true, ...ids };

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
