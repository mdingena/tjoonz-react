import { PLAY_NOW } from '../constants/actionTypes';

const playNow = id => (dispatch, getState) => {
  const { query } = getState();

  const item = query.results.find(item => item.id === id);

  dispatch({
    type: PLAY_NOW,
    payload: { item }
  });
};

export default playNow;
