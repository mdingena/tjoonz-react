import { SET_DETAILS } from '../constants/actionTypes';

const setDetails = id => (dispatch, getState) => {
  const { query } = getState();

  const mix = query.results.find(mix => mix.id === id);

  dispatch({
    type: SET_DETAILS,
    payload: {
      mix: mix || null
    }
  });
};

export default setDetails;
