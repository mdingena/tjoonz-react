import React from 'react';
import Sidebar from './Sidebar';
import Drawer from './Drawer';
import { DRAWER_PROPTYPES } from '../../constants/drawers';
import PropTypes from 'prop-types';

const Aside = ({ drawer, children }) =>
  drawer
    ? <Drawer drawerKey={drawer.KEY} align={drawer.ALIGN}>{children}</Drawer>
    : <Sidebar>{children}</Sidebar>;

Aside.propTypes = {
  drawer: PropTypes.shape(DRAWER_PROPTYPES),
  children: PropTypes.node.isRequired
};

export default Aside;
