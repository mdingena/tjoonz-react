import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectIsFacettedSearchItemSelected from '../../selectors/selectIsFacettedSearchItemSelected';
import toggleFacettedSearchItem from '../../actions/toggleFacettedSearchItem';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './FacettedSearchItem.module.css';

const FacettedSearchItem = ({ facet, item }) => {
  const dispatch = useDispatch();
  const isSelected = useSelector(selectIsFacettedSearchItemSelected(facet, item));

  const toggle = () => {
    const action = toggleFacettedSearchItem(facet, item);
    dispatch(action);
  };

  return (
    <div
      className={isSelected ? styles.checked : styles.unchecked}
      onClick={toggle}
      aria-checked={isSelected}
    >
      <label className={styles.label}>
        {isSelected
          ? <Icon.CheckSquare className={styles.icon} />
          : <Icon.Square className={styles.icon} />}
        <span className={styles.count}>
          <span>{item.count.toLocaleString()}</span>
          <Icon.Times className={styles.icon} />
        </span>
        <span dangerouslySetInnerHTML={{ __html: item.text }} />
      </label>
    </div>
  );
};

FacettedSearchItem.propTypes = {
  facet: PropTypes.shape({
    KEY: PropTypes.string.isRequired,
    ENDPOINT: PropTypes.string.isRequired
  }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }).isRequired
};

export default FacettedSearchItem;
