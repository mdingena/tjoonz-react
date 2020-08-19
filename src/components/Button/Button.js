import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
  onClick,
  text,
  Icon = () => null,
  disabled = false,
  align = 'center',
  type = 'button',
  danger = false
}) => {
  const className = [danger ? styles.danger : styles.root, styles[align]].join(' ');

  return (
    <button className={className} onClick={onClick} disabled={disabled} type={type}>
      {align !== 'right' && <Icon className={styles.iconLeft} />}
      {text && <span className={styles.text}>{text}</span>}
      {align === 'right' && <Icon className={styles.iconRight} />}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  Icon: PropTypes.func,
  disabled: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  type: PropTypes.oneOf(['button', 'submit']),
  danger: PropTypes.bool
};

export default Button;
