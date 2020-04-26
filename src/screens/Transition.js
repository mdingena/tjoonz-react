import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Transition.module.css';

const Transition = ({ location, duration = 300, children }) => {
  const timeout = useRef(null);

  const [state, setState] = useState({
    className: styles.opaque,
    currentLocation: location,
    currentChildren: children,
    previousLocation: null,
    previousChildren: null
  });

  const transitionIn = useCallback(() => {
    window.scrollTo(0, 0);
    setState(previousState => ({
      ...previousState,
      className: styles.root,
      previousLocation: null,
      previousChildren: null
    }));
    clearTimeout(timeout.current);
  }, []);

  const transitionOut = useCallback(() => {
    setState(({ currentLocation, currentChildren }) => ({
      className: styles.transparent,
      currentLocation: location,
      currentChildren: children,
      previousLocation: currentLocation,
      previousChildren: currentChildren
    }));
    timeout.current = setTimeout(transitionIn, duration);
  }, [location, children, transitionIn, duration]);

  useEffect(() => {
    /** @todo Maybe use useReducer here? */
    if (location.pathname !== state.currentLocation.pathname) {
      clearTimeout(timeout.current);
      transitionOut();
    }
  }, [location, state, children, transitionOut]);

  return (
    <div className={state.className} style={{ '--duration': `${duration}ms` }}>
      {state.previousChildren || state.currentChildren}
    </div>
  );
};

Transition.propTypes = {
  location: PropTypes.object.isRequired,
  duration: PropTypes.number,
  children: PropTypes.node.isRequired
};

export default Transition;
