import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
  onClick,
  text,
  Icon = () => null,
  disabled = false,
  type = 'normal',
  align = 'center'
}) => {
  const className = [styles.root, styles[type], styles[align]].join(' ');

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type='button'
    >
      {align !== 'right' && <Icon className={styles.iconLeft} />}
      {text && (
        <span className={styles.text}>
          {text}
        </span>
      )}
      {align === 'right' && <Icon className={styles.iconRight} />}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  Icon: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['normal', 'navigation']),
  align: PropTypes.oneOf(['left', 'center', 'right'])
};

export default Button;
