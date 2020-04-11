import React from 'react';
import { useDispatch } from 'react-redux';
import addTasks from '../../actions/addTasks';
import completeTasks from '../../actions/completeTasks';
import ProgressBar from './ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar
};

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const add5 = () => dispatch(addTasks('foo', 5));
  const complete1 = () => dispatch(completeTasks('foo', 1));

  return (
    <>
      <div style={{ padding: 50 }}>
        {children}
      </div>
      <button onClick={add5}>Add 5 tasks</button>
      <button onClick={complete1}>Complete 1 task</button>

    </>
  );
};

export const progressBar = () => (
  <Wrapper><ProgressBar /></Wrapper>
);
