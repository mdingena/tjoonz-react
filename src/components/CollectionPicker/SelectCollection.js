import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './SelectCollection.module.css';

const SelectCollection = ({ name, count, onClick, disabled = false }) => (
  <button className={styles.root} onClick={onClick} disabled={disabled} type='button'>
    <div className={styles.collection}>
      <div className={styles.name}>{name}</div>
      {disabled ? (
        <div className={styles.icon}>{disabled && <Icon.Check />}</div>
      ) : (
        <div className={styles.count}>{count.toLocaleString()}</div>
      )}
    </div>
  </button>
);

SelectCollection.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool
};

export default SelectCollection;
