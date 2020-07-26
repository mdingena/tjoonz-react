import React from 'react';
import { useDispatch } from 'react-redux';
import addTasks from '../../actions/addTasks';
import completeTasks from '../../actions/completeTasks';
import Navigation from './Navigation';

export default {
  title: 'Navigation',
  component: Navigation
};

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const add5 = () => dispatch(addTasks('foo', 5));
  const complete1 = () => dispatch(completeTasks('foo', 1));

  return (
    <>
      <div style={{ padding: 50 }}>{children}</div>
      <button onClick={add5}>Add 5 tasks</button>
      <button onClick={complete1}>Complete 1 task</button>
    </>
  );
};

export const navigation = () => (
  <Wrapper>
    <Navigation
      links={[
        { to: '/listen/', text: 'Listen' },
        { to: '/charts/', text: 'Charts' },
        { to: '/about/', text: 'About Tjoonz' },
        { to: '/about/uploading/', text: 'About Uploading' },
        { to: '/about/contributing/', text: 'Become an Editor' },
        { to: '/thanks/', text: 'Special Thanks' },
        { to: '/privacy-policy/', text: 'Privacy Policy' },
        { to: '/about/feedback/', text: 'Feedback' }
      ]}
    />
  </Wrapper>
);
