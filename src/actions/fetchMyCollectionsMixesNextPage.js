import {
  DONE_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE,
  APPEND_MY_COLLECTIONS_MIXES_RESULTS,
  START_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE
} from '../constants/actionTypes';
import { ENDPOINTS } from '../constants/api';
import addTasks from './addTasks';
import completeTasks from './completeTasks';
import { forgetAuth } from '../api/authentication';
import fetchPage from '../api/fetchPage';
import extractMixData from '../api/extractMixData';

const fetchMyCollectionsMixesNextPage = () => async (dispatch, getState) => {
  dispatch(startFetching());
  dispatch(addTasks(APPEND_MY_COLLECTIONS_MIXES_RESULTS, 1));

  const {
    auth: { token },
    collections
  } = getState();

  if (!collections.nextPage) {
    dispatch(doneFetching(null, 'There are no more results.'));
    dispatch(completeTasks(APPEND_MY_COLLECTIONS_MIXES_RESULTS, 1));
    return;
  }

  if (!token) {
    forgetAuth();
    dispatch(doneFetching('Please sign in to access your collections.'));
    dispatch(completeTasks(APPEND_MY_COLLECTIONS_MIXES_RESULTS, 1));
    return;
  }

  if (!collections.current.mixes.length) {
    dispatch(doneFetching('This collection is empty.'));
    dispatch(completeTasks(APPEND_MY_COLLECTIONS_MIXES_RESULTS, 1));
    return;
  }

  const options = { _embed: true };

  if (collections.current.mixes.length) options.include = collections.current.mixes.join(',');

  const response = await fetchPage(ENDPOINTS.MIXES, collections.nextPage, options);

  if (!response.ok) {
    dispatch(doneFetching(null, response.statusText));
    dispatch(completeTasks(APPEND_MY_COLLECTIONS_MIXES_RESULTS, 1));
    return;
  }

  const mixes = response.resources.map(extractMixData);

  dispatch(appendMyCollectionsMixesResults(mixes));

  const nextPage = response.pageCount > collections.nextPage ? collections.nextPage + 1 : null;

  dispatch(doneFetching(nextPage));
  dispatch(completeTasks(APPEND_MY_COLLECTIONS_MIXES_RESULTS, 1));
};

export default fetchMyCollectionsMixesNextPage;

const startFetching = () => ({
  type: START_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE
});

const doneFetching = (nextPage, statusText = null) => ({
  type: DONE_FETCHING_NEXT_MY_COLLECTIONS_RESULTS_PAGE,
  payload: { nextPage, statusText }
});

const appendMyCollectionsMixesResults = results => ({
  type: APPEND_MY_COLLECTIONS_MIXES_RESULTS,
  payload: { results }
});
