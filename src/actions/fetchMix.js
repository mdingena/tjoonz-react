import { DONE_FETCHING_MIX, SET_MIX, START_FETCHING_MIX } from '../constants/actionTypes';
import { ENDPOINTS } from '../constants/api';
import addTasks from '../actions/addTasks';
import completeTasks from '../actions/completeTasks';
import fetchPage from '../api/fetchPage';
import extractMixData from '../api/extractMixData';

const fetchMix = slug => async (dispatch, getState) => {
  dispatch(startFetching());
  dispatch(addTasks(SET_MIX, 1));

  const options = { slug, _embed: true };

  const response = await fetchPage(ENDPOINTS.MIXES, 1, options);

  if (!response.ok) {
    dispatch(doneFetching(response.statusText));
    dispatch(completeTasks(SET_MIX, 1));
    return;
  }

  const mix = response.resources.map(extractMixData)[0];

  dispatch(setMix(mix || {}));
  dispatch(doneFetching(!mix ? "Couldn't find mix." : null));
  dispatch(completeTasks(SET_MIX, 1));
};

export default fetchMix;

const startFetching = () => ({
  type: START_FETCHING_MIX
});

const doneFetching = (statusText = null) => ({
  type: DONE_FETCHING_MIX,
  payload: { statusText }
});

const setMix = result => ({
  type: SET_MIX,
  payload: { result }
});
