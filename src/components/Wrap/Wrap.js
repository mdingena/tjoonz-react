import React from 'react';
import PropTypes from 'prop-types';
import styles from './Wrap.module.css';

const Wrap = ({ children }) => (
  <div className={styles.root}>
    {children}
  </div>
);

Wrap.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrap;
