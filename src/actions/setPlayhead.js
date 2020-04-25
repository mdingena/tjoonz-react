import { SET_PLAYHEAD } from '../constants/actionTypes';

const setPlayhead = index => (dispatch, getState) => {
  const { player: { playlist } } = getState();

  const isValidIndex = playlist[index];

  if (isValidIndex) {
    dispatch({
      type: SET_PLAYHEAD,
      payload: { index }
    });
  }
};

export default setPlayhead;
