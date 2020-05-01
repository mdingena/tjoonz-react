import { START_PLAYBACK } from '../constants/actionTypes';

const startPlayback = id => (dispatch, getState) => {
  const { query, mix } = getState();

  const cache = [...query.results.filter(item => item.id !== mix.current.id), mix.current];

  const item = cache.find(item => item.id === id);

  dispatch({
    type: START_PLAYBACK,
    payload: { item }
  });
};

export default startPlayback;
