import React from 'react';
import ResizeObserverProvider from './providers/ResizeObserver';

const App = () => (
  <ResizeObserverProvider>
    <div className='app' />
  </ResizeObserverProvider>
);

export default App;
