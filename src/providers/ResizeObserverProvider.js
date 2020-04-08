import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from '@envato/react-breakpoints';
import { ResizeObserver } from '@juggle/resize-observer';

export const ResizeObserverProvider = ({ children }) => (
  <Provider ponyfill={ResizeObserver}>
    {children}
  </Provider>
);

ResizeObserverProvider.propTypes = {
  children: PropTypes.node.isRequired
};
