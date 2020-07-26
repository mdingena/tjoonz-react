import React from 'react';
import { useDispatch } from 'react-redux';
import { DRAWER_PROPTYPES } from '../../constants/drawers';
import closeDrawer from '../../actions/closeDrawer';
import LoadingSpinner from '../LoadingSpinner';
import styles from './CloseButton.module.css';

const CloseButton = ({ drawer }) => {
  const dispatch = useDispatch();
  const className = [styles.root, styles[drawer.ALIGN]].join(' ');

  const handleClick = () => {
    const action = closeDrawer();
    dispatch(action);
  };

  const Icon = drawer.CLOSE_ICON || (() => null);

  return (
    <button className={className} onClick={handleClick} type='button'>
      {drawer.ALIGN !== 'right' && <Icon className={styles.iconLeft} />}
      {drawer.SHOW_PROGRESS && drawer.ALIGN === 'right' && (
        <div className={styles.spinnerLeft}>
          <LoadingSpinner size={32} />
        </div>
      )}
      {drawer.CLOSE_TEXT && <span className={styles.text}>{drawer.CLOSE_TEXT}</span>}
      {drawer.SHOW_PROGRESS && drawer.ALIGN !== 'right' && (
        <div className={styles.spinnerRight}>
          <LoadingSpinner size={32} />
        </div>
      )}
      {drawer.ALIGN === 'right' && <Icon className={styles.iconRight} />}
    </button>
  );
};

CloseButton.propTypes = {
  drawer: DRAWER_PROPTYPES
};

export default CloseButton;
