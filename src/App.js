import React from 'react';
import StoreProvider from './providers/StoreProvider';
import ResizeObserverProvider from './providers/ResizeObserverProvider';

const App = () => (
  <StoreProvider>
    <ResizeObserverProvider>
      <div className='app' />
    </ResizeObserverProvider>
  </StoreProvider>
);

export default App;
