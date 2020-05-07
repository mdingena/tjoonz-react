import React, { useRef, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectAuth from '../../selectors/selectAuth';
import selectComment from '../../selectors/selectComment';
import submitComment from '../../actions/submitComment';
import Button from '../Button';
import Icon from '../Icon';
import he from 'he';
import styles from './CommentForm.module.css';

const CommentForm = ({ id }) => {
  const ref = useRef();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const comment = useSelector(selectComment);

  const handleSignIn = useCallback(() => {
    history.push('/sign-in/', { from: location.pathname });
  }, [history, location.pathname]);

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    const { comment } = event.target.elements;

    const action = submitComment(comment.value, id);
    dispatch(action);
  }, [dispatch, id]);

  useEffect(() => {
    if (ref.current && !comment.isSubmitting && comment.statusText === null) {
      ref.current.value = '';
    }
  }, [comment]);

  if (!auth.token) {
    return (
      <Button
        onClick={handleSignIn}
        text='Sign in to comment'
        Icon={Icon.ShieldCheck}
      />
    );
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        ref={ref}
        id='comment'
        placeholder='Write a comment'
        aria-label='Write a comment'
      />
      {comment.statusText && (
        <div className={styles.statusText}>{he.decode(comment.statusText)}</div>
      )}
      <Button
        text={comment.isSubmitting ? 'Submitting' : 'Submit comment'}
        Icon={comment.isSubmitting ? Icon.Snooze : Icon.CommentAltCheck}
        type='submit'
        disabled={comment.isSubmitting}
      />
    </form>
  );
};

export default CommentForm;
