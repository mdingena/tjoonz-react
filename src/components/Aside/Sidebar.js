import React from 'react';
import StickyBox from 'react-sticky-box';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

const Sidebar = ({ children }) => (
  <aside>
    <StickyBox
      className={styles.root}
      offsetTop={65}
      offsetBottom={136}
    >
      {children}
    </StickyBox>
  </aside>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired
};

export default Sidebar;
