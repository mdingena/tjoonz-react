import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import selectDrawer from '../../selectors/selectDrawer';
import PropTypes from 'prop-types';
import styles from './Drawer.module.css';

const Drawer = ({ drawerKey, align, children }) => {
  const timeout = useRef(null);
  const ref = useRef(null);

  const [wasOpen, setOpen] = useState(false);
  const drawer = useSelector(selectDrawer);

  const isOpen = drawer && drawer.KEY === drawerKey;

  useEffect(() => {
    if (isOpen && !wasOpen) {
      clearTimeout(timeout);
      timeout.current = setTimeout(() => setOpen(true), 10);
    } else if (!isOpen && wasOpen) {
      clearTimeout(timeout);
      timeout.current = setTimeout(() => {
        ref.current.scrollTo(0, 0);
        setOpen(false);
      }, 300);
    }
  }, [isOpen, wasOpen]);

  const showOverlay = wasOpen || isOpen;
  const revealClassName = drawer && drawer.TRANSPARENT_OVERLAY ? styles.revealTransparent : styles.revealOpaque;
  const className = wasOpen && isOpen ? revealClassName : styles.hide;

  return (
    <>
      {showOverlay && <div className={className} />}
      <aside className={isOpen ? styles.open : styles[align]}>
        <div ref={ref} className={styles.overflow}>
          {children}
        </div>
      </aside>
    </>
  );
};

Drawer.propTypes = {
  drawerKey: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'right']).isRequired,
  children: PropTypes.node.isRequired
};

export default Drawer;
