import { SET_AUTH } from '../constants/actionTypes';

const setAuth = auth => ({
  type: SET_AUTH,
  payload: { auth }
});

export default setAuth;
