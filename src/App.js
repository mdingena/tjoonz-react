import React from 'react';
import { StoreProvider } from './providers/StoreProvider';
import { ResizeObserverProvider } from './providers/ResizeObserverProvider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Navigation } from './components/Navigation';

const App = () => (
  <StoreProvider>
    <ResizeObserverProvider>
      <Router>
        <Navigation
          links={[
            { to: 'listen', text: 'Listen' },
            { to: 'charts', text: 'Charts' },
            { to: 'test1', text: 'Test 1' },
            { to: 'test2', text: 'Test 2' },
            { to: 'test3', text: 'Test 3' },
            { to: 'test4', text: 'Test 4' },
            { to: 'test5', text: 'Test 5' },
            { to: 'test6', text: 'Test 6' },
            { to: 'test7', text: 'Test 7' },
            { to: 'test8', text: 'Test 8' }
          ]}
        />

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
