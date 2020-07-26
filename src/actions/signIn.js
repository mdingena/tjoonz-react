import { DONE_SIGNING_IN, SET_AUTH, START_SIGNING_IN } from '../constants/actionTypes';
import addTasks from '../actions/addTasks';
import completeTasks from '../actions/completeTasks';
import { authenticate } from '../api/authentication';

const signIn = (username, password) => async dispatch => {
  dispatch(startAuthenticating());
  dispatch(addTasks(SET_AUTH, 1));

  const authentication = await authenticate(username, password);

  if (!authentication.token) {
    dispatch(doneAuthenticating('Invalid credentials'));
    dispatch(completeTasks(SET_AUTH, 1));
    return;
  }

  dispatch(doneAuthenticating());
  dispatch(completeTasks(SET_AUTH, 1));
};

export default signIn;

const startAuthenticating = () => ({
  type: START_SIGNING_IN
});

const doneAuthenticating = (statusText = null) => ({
  type: DONE_SIGNING_IN,
  payload: { statusText }
});
