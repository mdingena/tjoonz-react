import React, { useCallback } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectAuth from '../../selectors/selectAuth';
import signIn from '../../actions/signIn';
import he from 'he';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import styles from './SignIn.module.css';

/* eslint-disable react/jsx-no-target-blank */

const SignIn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      const { username, password } = event.target.elements;
      const action = signIn(username.value, password.value);

      dispatch(action);
    },
    [dispatch]
  );

  const redirectTo = (location.state || {}).from || '/';

  if (auth.token) return <Redirect to={redirectTo} />;

  return (
    <>
      <form className={styles.root} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          id='username'
          type='text'
          placeholder='Username'
          autoComplete='username'
          autoFocus
          aria-label='Username'
        />
        <input
          className={styles.input}
          id='password'
          type='password'
          placeholder='Password'
          autoComplete='current-password'
          aria-label='Password'
        />
        {auth.statusText && <div className={styles.statusText}>{he.decode(auth.statusText)}</div>}
        <div className={styles.submit}>
          <Button
            text={auth.isAuthenticating ? 'Signing in' : 'Sign in'}
            Icon={auth.isAuthenticating ? Icon.Snooze : Icon.ShieldCheck}
            type='submit'
            disabled={auth.isAuthenticating}
          />
        </div>
      </form>
      <a
        className={styles.link}
        href='https://www.tjoonz.com/system/wp-login.php?action=lostpassword'
        rel='noopener referrer'
        target='_blank'
      >
        Lost your password?
      </a>
      <a
        className={styles.link}
        href='https://www.tjoonz.com/system/wp-login.php?action=register'
        rel='noopener referrer'
        target='_blank'
      >
        Register
      </a>
    </>
  );
};

export default SignIn;
