import React from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';

const Screens = ({ routes }) => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {routes.map(route => <Route key={route.path} {...route} />)}
    </Routes>
  );
};

Screens.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    element: PropTypes.node.isRequired
  })).isRequired
};

export default Screens;
