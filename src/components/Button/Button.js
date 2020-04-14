import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, text, Icon = () => null, disabled = false }) => (
  <button
    className={styles.root}
    onClick={onClick}
    disabled={disabled}
    type='button'
  >
    <Icon className={styles.icon} />
    <span className={styles.text}>
      {text}
    </span>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
