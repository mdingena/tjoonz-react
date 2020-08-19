import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import setMyCollectionsCurrent from '../../actions/setMyCollectionsCurrent';
import closeDrawer from '../../actions/closeDrawer';
import Icon from '../Icon';
import styles from './ManageCollection.module.css';

const ManageCollection = ({ id, name, count, active = false }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setMyCollectionsCurrent(id));
    dispatch(closeDrawer());
  };

  return (
    <button className={active ? styles.active : styles.inactive} onClick={handleClick} disabled={active} type='button'>
      <div className={styles.collection}>
        <div className={styles.name}>{name}</div>
        <div className={styles.count}>{count.toLocaleString()}</div>
      </div>
      <div className={styles.icon}>{active && <Icon.ChevronRight />}</div>
    </button>
  );
};

ManageCollection.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  active: PropTypes.bool
};

export default ManageCollection;
