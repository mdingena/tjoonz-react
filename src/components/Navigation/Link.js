import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useResizeObserver } from '@envato/react-breakpoints';
import styles from './Link.module.css';

export const Link = ({ to, text, onResize, onClick, collapsed = false }) => {
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
      ref={ref}
    >
      {text}
    </NavLink>
  );
};
