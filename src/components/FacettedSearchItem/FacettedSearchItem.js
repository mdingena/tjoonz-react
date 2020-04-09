import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IsFacettedSearchItemChecked from '../../selectors/IsFacettedSearchItemChecked';
import toggleFacettedSearchItem from '../../actions/toggleFacettedSearchItem';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './FacettedSearchItem.module.css';

const FacettedSearchItem = ({ facet, itemId, text, count }) => {
  const dispatch = useDispatch();
  const isChecked = useSelector(IsFacettedSearchItemChecked(facet, itemId));

  const toggle = () => {
    const action = toggleFacettedSearchItem(facet, itemId);
    dispatch(action);
  };

  return (
    <div
      className={isChecked ? styles.checked : styles.unchecked}
      onClick={toggle}
      aria-checked={isChecked}
    >
      <label className={styles.label}>
        {isChecked
          ? <Icon.CheckSquare className={styles.icon} />
          : <Icon.Square className={styles.icon} />}
        <span className={styles.count}>
          <span>{count.toLocaleString()}</span>
          <Icon.Times className={styles.icon} />
        </span>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </label>
    </div>
  );
};

FacettedSearchItem.propTypes = {
  facet: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default FacettedSearchItem;
