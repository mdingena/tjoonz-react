import {
  DONE_FETCHING_MY_COLLECTIONS_RESULTS,
  SET_MY_COLLECTIONS_RESULTS,
  START_FETCHING_MY_COLLECTIONS_RESULTS
} from '../constants/actionTypes';
import addTasks from './addTasks';
import completeTasks from './completeTasks';
import fetchMyCollectionsMixes from './fetchMyCollectionsMixes';
import { forgetAuth } from '../api/authentication';
import getMyCollections from '../api/getMyCollections';
import extractCollectionData from '../api/extractCollectionData';

const fetchMyCollections = (fetchWithMixes = false) => async (dispatch, getState) => {
  dispatch(startFetching());
  dispatch(addTasks(SET_MY_COLLECTIONS_RESULTS, 1));

  const {
    auth: { token }
  } = getState();

  if (!token) {
    forgetAuth();
    dispatch(doneFetching('Please sign in to access your playlists.'));
    dispatch(completeTasks(SET_MY_COLLECTIONS_RESULTS, 1));
    return;
  }

  const response = await getMyCollections(token);

  if (!response.ok) {
    const { message } = await response.json();
    dispatch(doneFetching(message));
    dispatch(completeTasks(SET_MY_COLLECTIONS_RESULTS, 1));
    return;
  }

  const result = await response.json();

  if (!result.success) {
    dispatch(doneFetching(result.error.message));
    dispatch(completeTasks(SET_MY_COLLECTIONS_RESULTS, 1));
    return;
  }

  const collections = result.result.collections.map(extractCollectionData);

  dispatch(setMyCollectionsResults(collections));

  if (fetchWithMixes) dispatch(fetchMyCollectionsMixes());

  dispatch(doneFetching());
  dispatch(completeTasks(SET_MY_COLLECTIONS_RESULTS, 1));
};

export default fetchMyCollections;

const startFetching = () => ({
  type: START_FETCHING_MY_COLLECTIONS_RESULTS
});

const doneFetching = (statusText = null) => ({
  type: DONE_FETCHING_MY_COLLECTIONS_RESULTS,
  payload: { statusText }
});

const setMyCollectionsResults = results => ({
  type: SET_MY_COLLECTIONS_RESULTS,
  payload: { results }
});
