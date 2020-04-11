import React from 'react';
import { useSelector } from 'react-redux';
import selectAllTasks from '../../selectors/selectAllTasks';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const { completed, queued } = useSelector(selectAllTasks);
  const progress = queued > 0 ? (completed / queued) : 1;
  const progressing = progress < 1;

  return (
    <div className={progressing ? styles.progressing : styles.done}>
      <div className={styles.progressBar} style={{ '--width': `${progress * 100}%` }} />
    </div>
  );
};

export default ProgressBar;
