import { SET_DETAILS } from '../constants/actionTypes';

const setDetails = mix => ({
  type: SET_DETAILS,
  payload: { mix }
});

export default setDetails;
