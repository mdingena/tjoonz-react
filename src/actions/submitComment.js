import he from 'he';
import {
  DONE_SUBMITTING_COMMENT,
  START_SUBMITTING_COMMENT,
  SUBMIT_COMMENT
} from '../constants/actionTypes';
import addTasks from '../actions/addTasks';
import completeTasks from '../actions/completeTasks';
import { forgetAuth } from '../api/authentication';
import { stripHtmlTags } from '../utils';
import { toPublishDate } from '../api/extractMixData';
import postComment from '../api/postComment';
import prependComment from '../actions/prependComment';

const submitComment = (comment, id) => async (dispatch, getState) => {
  dispatch(startSubmitting(id));
  dispatch(addTasks(SUBMIT_COMMENT, 1));

  const { auth: { token } } = getState();

  if (!token) {
    forgetAuth();
    dispatch(doneSubmitting('Please sign in to comment.'));
    dispatch(completeTasks(SUBMIT_COMMENT, 1));
    return;
  }

  const sanitisedComment = stripHtmlTags(comment);

  if (!sanitisedComment) {
    dispatch(doneSubmitting('Comment must not be empty.'));
    dispatch(completeTasks(SUBMIT_COMMENT, 1));
    return;
  }

  const encodedComment = he.encode(sanitisedComment);

  const response = await postComment(encodedComment, id, token);

  if (!response.ok) {
    const { message } = await response.json();
    dispatch(doneSubmitting(message));
    dispatch(completeTasks(SUBMIT_COMMENT, 1));
    return;
  }

  const json = await response.json();

  const parsedComment = parseComment(json);

  dispatch(prependComment(parsedComment));
  dispatch(doneSubmitting());
  dispatch(completeTasks(SUBMIT_COMMENT, 1));
};

export default submitComment;

const startSubmitting = id => ({
  type: START_SUBMITTING_COMMENT,
  payload: { id }
});

const doneSubmitting = (statusText = null) => ({
  type: DONE_SUBMITTING_COMMENT,
  payload: { statusText }
});

const parseComment = comment => ({
  id: comment.id,
  authorName: he.decode(comment.author_name),
  authorUrl: comment.author_url,
  authorAvatar: comment.author_avatar_urls['96'],
  published: toPublishDate(comment.date),
  content: he.decode(comment.content.rendered)
});
