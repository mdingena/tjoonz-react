import React from 'react';
import { useSelector } from 'react-redux';
import selectTasks from '../../selectors/selectTasks';
import selectAllTasks from '../../selectors/selectAllTasks';
import PropTypes from 'prop-types';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ taskKey = undefined }) => {
  const { completed, pending } = useSelector(taskKey ? selectTasks(taskKey) : selectAllTasks);
  const progress = pending > 0 ? (completed / pending) : 1;
  const progressing = progress < 1;

  return (
    <div className={progressing ? styles.progressing : styles.done}>
      <div className={styles.progressBar} style={{ '--width': `${progress * 100}%` }} />
    </div>
  );
};

ProgressBar.propTypes = {
  taskKey: PropTypes.string
};

export default ProgressBar;
