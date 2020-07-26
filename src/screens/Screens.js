import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import Transition from './Transition';
import PropTypes from 'prop-types';

const Screens = ({ children }) => {
  const location = useLocation();

  return (
    <Transition location={location}>
      <Switch location={location}>{children}</Switch>
    </Transition>
  );
};

Screens.propTypes = {
  children: PropTypes.node.isRequired
};

export default Screens;
