import React from 'react';
import { useSelector } from 'react-redux';
import selectDrawer from '../../selectors/selectDrawer';
import PropTypes from 'prop-types';
import styles from './Drawer.module.css';

const Drawer = ({ align, children }) => {
  const isOpen = useSelector(selectDrawer);

  return (
    <aside className={isOpen ? styles.open : styles[align]}>
      <div className={styles.padding}>
        <div className={styles.overflow}>
          {children}
        </div>
      </div>
    </aside>
  );
};

Drawer.propTypes = {
  align: PropTypes.oneOf(['left', 'right']).isRequired,
  children: PropTypes.node.isRequired
};

export default Drawer;
