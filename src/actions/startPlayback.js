import { START_PLAYBACK } from '../constants/actionTypes';

const startPlayback = id => (dispatch, getState) => {
  const { query } = getState();

  const item = query.results.find(item => item.id === id);

  dispatch({
    type: START_PLAYBACK,
    payload: { item }
  });
};

export default startPlayback;
