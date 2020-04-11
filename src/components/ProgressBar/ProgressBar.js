import React from 'react';
import { useSelector } from 'react-redux';
import selectTasksTotal from '../../selectors/selectTasksTotal';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const { completed, pending } = useSelector(selectTasksTotal);
  const progress = pending > 0 ? (completed / pending) : 1;
  const progressing = progress < 1;

  return (
    <div className={progressing ? styles.progressing : styles.done}>
      <div className={styles.progressBar} style={{ '--width': `${progress * 100}%` }} />
    </div>
  );
};

export default ProgressBar;
