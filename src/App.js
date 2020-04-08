import React from 'react';
import StoreProvider from './providers/StoreProvider';
import ResizeObserverProvider from './providers/ResizeObserverProvider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

const App = () => (
  <StoreProvider>
    <ResizeObserverProvider>
      <Router>
        <nav>Nav</nav>

        <Routes>
          <Route path='/' element={<div>Home <Link to='listen'>Listen</Link></div>} />
          <Route path='listen' element={<div>Listen <Link to='/'>Back home</Link></div>} />
        </Routes>

        <div className='player'>Player</div>
      </Router>
    </ResizeObserverProvider>
  </StoreProvider>
);

export default App;
