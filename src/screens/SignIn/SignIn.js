import React, { useCallback } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectAuth from '../../selectors/selectAuth';
import signIn from '../../actions/signIn';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import styles from './SignIn.module.css';

const SignIn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    const { username, password } = event.target.elements;
    const action = signIn(username.value, password.value);

    dispatch(action);
  }, [dispatch]);

  const redirectTo = (location.state || {}).from || '/';

  if (auth.token) return <Redirect to={redirectTo} />;

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        id='username'
        type='text'
        placeholder='Username'
        autoComplete='username'
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
      <div className={styles.submit}>
        <Button
          text={auth.isAuthenticating ? 'Signing in' : 'Sign in'}
          Icon={auth.isAuthenticating ? Icon.Snooze : Icon.ShieldCheck}
          type='submit'
          disabled={auth.isAuthenticating}
        />
      </div>
    </form>
  );
};

export default SignIn;
