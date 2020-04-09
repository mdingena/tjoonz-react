import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useResizeObserver } from '@envato/react-breakpoints';
import PropTypes from 'prop-types';
import styles from './Link.module.css';

const noOp = () => {};

export const Link = ({ to, text, onResize, onClick = noOp, collapsed = false }) => {
  const [ref, observedEntry] = useResizeObserver({ box: 'border-box' });

  useEffect(() => {
    const width = Math.ceil(observedEntry && observedEntry.borderBoxSize[0].inlineSize) || 0;
    onResize(width);
  }, [observedEntry, onResize]);

  return (
    <NavLink
      to={to}
      className={collapsed ? styles.collapsed : styles.root}
      activeClassName={styles.active}
      onClick={onClick}
    >
      <span
        ref={ref}
        className={styles.text}
      >
        {text}
      </span>
    </NavLink>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onResize: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  collapsed: PropTypes.bool
};
