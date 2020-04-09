import React, { useState, useCallback, useEffect } from 'react';
import { useResizeObserver } from '@envato/react-breakpoints';
import { NavLink } from 'react-router-dom';
import Link from './Link';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';

const Navigation = ({ links = [] }) => {
  const [linkWidths, setLinkWidths] = useState({});
  const [cutoffIndex, setCutoffIndex] = useState(0);
  const [ref, observedEntry] = useResizeObserver({ box: 'content-box' });

  /**
   * Refresh `linkWidths` with the changed link width.
   * @param {string} to - NavLink location used as the key.
   * @param {*} width - Width of the NavLink saved as the value.
   */
  const handleLinkResize = (to, width) => {
    if (width > 0 && width !== linkWidths[to]) {
      const widths = { ...linkWidths, [to]: width };
      setLinkWidths(widths);
    }
  };

  /*
   * Calculate how much available space is consumed and at which
   * point to cut off the list of NavLinks.
   */
  const calculateCutoffIndex = useCallback(() => {
    const containerWidth = Math.floor(observedEntry && observedEntry.contentBoxSize[0].inlineSize) || 0;
    let sumWidth = 0;
    let index = 0;

    if (containerWidth) {
      for (const { to } of links) {
        sumWidth += linkWidths[to];
        if (sumWidth > containerWidth) break;
        ++index;
      }
    }

    return index;
  }, [links, linkWidths, observedEntry]);

  /* Initialise linkWidths when the `links` prop changes. */
  useEffect(() => {
    const widths = {};

    links.forEach(({ to }) => {
      widths[to] = 0;
    });

    setLinkWidths(widths);
    setCutoffIndex(0);
  }, [links]);

  /* When a resize is detected, recalculate the cutoff index. */
  useEffect(() => {
    const index = calculateCutoffIndex();
    setCutoffIndex(index);
  }, [linkWidths, observedEntry, calculateCutoffIndex]);

  const visibleLinks = links.slice(0, cutoffIndex);
  const hiddenLinks = links.slice(cutoffIndex);

  return (
    <div className={styles.root}>
      <NavLink to='/' className={styles.logo}>Tjoonz.com</NavLink>
      <div ref={ref} className={styles.links}>
        {visibleLinks.map(({ to, text }) => (
          <Link
            key={to}
            to={to}
            text={text}
            onResize={width => handleLinkResize(to, width)}
          />
        ))}
      </div>
      <div>
        {hiddenLinks.length > 0 && (
          <Downshift>
            {({
              getMenuProps,
              isOpen,
              getToggleButtonProps,
              closeMenu
            }) => (
              <div className={isOpen ? styles.open : styles.closed}>
                <button
                  className={styles.button}
                  aria-label='toggle menu'
                  {...getToggleButtonProps()}
                >
                  &#8942;
                </button>
                <div className={styles.list} {...getMenuProps()}>
                  {isOpen && hiddenLinks.map(({ to, text }) => (
                    <Link
                      key={to}
                      to={to}
                      text={text}
                      onResize={width => handleLinkResize(to, width)}
                      onClick={() => closeMenu()}
                      collapsed
                    />
                  ))}
                </div>
              </div>
            )}
          </Downshift>
        )}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired
};

export default Navigation;
