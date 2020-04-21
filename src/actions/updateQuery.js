import {
  DONE_FETCHING_QUERY_RESULTS,
  SET_QUERY_RESULTS,
  START_FETCHING_QUERY_RESULTS
} from '../constants/actionTypes';
import { ENDPOINTS } from '../constants/api';
import { ARTISTS, GENRES, TAGS } from '../constants/facettedSearchFacets';
import addTasks from '../actions/addTasks';
import completeTasks from '../actions/completeTasks';
import fetchPage from '../api/fetchPage';
import extractMixData from '../api/extractMixData';

const updateQuery = () => async (dispatch, getState) => {
  const { facettedSearch } = getState();

  dispatch(startFetching(facettedSearch));
  dispatch(addTasks(SET_QUERY_RESULTS, 1));

  const options = { _embed: true };

  if (facettedSearch[ARTISTS.KEY].selected.length > 0) options[ARTISTS.TAXONOMY] = facettedSearch[ARTISTS.KEY].selected.map(({ id }) => id).join(',');
  if (facettedSearch[GENRES.KEY].selected.length > 0) options[GENRES.TAXONOMY] = facettedSearch[GENRES.KEY].selected.map(({ id }) => id).join(',');
  if (facettedSearch[TAGS.KEY].selected.length > 0) options[TAGS.TAXONOMY] = facettedSearch[TAGS.KEY].selected.map(({ id }) => id).join(',');

  const response = await fetchPage(ENDPOINTS.MIXES, 1, options);

  if (!response.ok) {
    dispatch(doneFetching(null, response.statusText));
    dispatch(completeTasks(SET_QUERY_RESULTS, 1));
    return;
  }

  const mixes = response.resources.map(extractMixData);

  dispatch(setQueryResults(mixes));

  const nextPage = response.pageCount > 1 ? 2 : null;

  dispatch(doneFetching(nextPage));
  dispatch(completeTasks(SET_QUERY_RESULTS, 1));
};

export default updateQuery;

const startFetching = facettedSearch => ({
  type: START_FETCHING_QUERY_RESULTS,
  payload: { facettedSearch }
});

const doneFetching = (nextPage, statusText = null) => ({
  type: DONE_FETCHING_QUERY_RESULTS,
  payload: { nextPage, statusText }
});

const setQueryResults = results => ({
  type: SET_QUERY_RESULTS,
  payload: { results }
});
