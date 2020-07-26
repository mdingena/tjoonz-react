import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import PropTypes from 'prop-types';
import styles from './Wrap.module.css';

const Wrap = ({ observe = false, children }) =>
  observe ? (
    <Observe
      box='content-box'
      render={({ observedElementProps }) => (
        <div className={styles.root} {...observedElementProps}>
          {children}
        </div>
      )}
    />
  ) : (
    <div className={styles.root}>{children}</div>
  );

Wrap.propTypes = {
  observe: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Wrap;
