import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import selectAllTasks from '../../selectors/selectAllTasks';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  const { completed, count } = useSelector(selectAllTasks);
  const shouldSettle = count === 0 && completed === 0;
  const [isSettled, setSettled] = useState(false);

  const [classNameA, setClassNameA] = useState(styles.leftSettled);
  const [classNameB, setClassNameB] = useState(styles.rightSettled);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!shouldSettle) setSettled(false);
  }, [shouldSettle]);

  useEffect(() => {
    const interval = isSettled ? null : setInterval(() => setTick(t => t + 1), 80);

    return () => {
      clearInterval(interval);
      setTick(t => (t >= 6 ? 6 : 0));
    };
  }, [isSettled]);

  useEffect(() => {
    switch (tick) {
      case 0:
        setClassNameA('leftExpandVertically');
        setClassNameB('rightExpandVertically');
        if (shouldSettle) setSettled(true);
        break;

      case 1:
      case 2:
        setClassNameA('leftShrinkVertically');
        setClassNameB('rightShrinkVertically');
        break;

      case 3:
        setClassNameA('topExpandHorizontally');
        setClassNameB('bottomExpandHorizontally');
        break;

      case 4:
      case 5:
        setClassNameA('topShrinkHorizontally');
        setClassNameB('bottomShrinkHorizontally');
        break;

      case 6:
        setClassNameA('rightExpandVertically');
        setClassNameB('leftExpandVertically');
        if (shouldSettle) setSettled(true);
        break;

      case 7:
      case 8:
        setClassNameA('rightShrinkVertically');
        setClassNameB('leftShrinkVertically');
        break;

      case 9:
        setClassNameA('bottomExpandHorizontally');
        setClassNameB('topExpandHorizontally');
        break;

      case 10:
      case 11:
        setClassNameA('bottomShrinkHorizontally');
        setClassNameB('topShrinkHorizontally');
        break;

      default:
        setTick(0);
    }
  }, [tick, shouldSettle]);

  return (
    <div className={styles.root}>
      <div className={styles.skew}>
        <div className={styles[classNameA]} />
        <div className={styles[classNameB]} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
