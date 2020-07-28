import { DONE_SUBMITTING_VOTE, START_SUBMITTING_VOTE, SUBMIT_VOTE } from '../constants/actionTypes';
import addTasks from './addTasks';
import completeTasks from './completeTasks';
import fetchMix from './fetchMix';
import { forgetAuth } from '../api/authentication';
import postVote from '../api/postVote';

const submitVote = (liked, id, slug) => async (dispatch, getState) => {
  dispatch(startSubmitting());
  dispatch(addTasks(SUBMIT_VOTE, 1));

  const {
    auth: { token }
  } = getState();

  if (!token) {
    forgetAuth();
    dispatch(doneSubmitting('Please sign in to vote.'));
    dispatch(completeTasks(SUBMIT_VOTE, 1));
    return;
  }

  const response = await postVote(liked, id, token);

  if (!response.ok) {
    const { message } = await response.json();
    dispatch(doneSubmitting(message));
    dispatch(completeTasks(SUBMIT_VOTE, 1));
    return;
  }

  const result = await response.json();

  if (!result.success) {
    dispatch(doneSubmitting(result.error.message));
    dispatch(completeTasks(SUBMIT_VOTE, 1));
    return;
  }

  dispatch(fetchMix(slug));
  dispatch(doneSubmitting());
  dispatch(completeTasks(SUBMIT_VOTE, 1));
};

export default submitVote;

const startSubmitting = () => ({
  type: START_SUBMITTING_VOTE
});

const doneSubmitting = (statusText = null) => ({
  type: DONE_SUBMITTING_VOTE,
  payload: { statusText }
});
