import React from 'react';
import { useDispatch } from 'react-redux';
import closeDrawer from '../../actions/closeDrawer';
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
    <button
      className={className}
      onClick={handleClick}
      type='button'
    >
      {drawer.ALIGN !== 'right' && <Icon className={styles.iconLeft} />}
      {drawer.CLOSE_TEXT && (
        <span className={styles.text}>
          {drawer.CLOSE_TEXT}
        </span>
      )}
      {drawer.ALIGN === 'right' && <Icon className={styles.iconRight} />}
    </button>
  );
};

export default CloseButton;
