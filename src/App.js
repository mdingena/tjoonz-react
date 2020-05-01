import React from 'react';
import StoreProvider from './providers/StoreProvider';
import ResizeObserverProvider from './providers/ResizeObserverProvider';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Wrap from './components/Wrap';
import Navigation from './components/Navigation';
import Player from './components/Player';
import Playlist from './components/Playlist';
import Screens from './screens';
import Home from './screens/Home';
import Mix from './screens/Mix';
import styles from './App.module.css';

const App = () => (
  <StoreProvider>
    <ResizeObserverProvider>
      <Router>
        <Route path='/:url*' exact strict render={props => <Redirect to={`${props.location.pathname}/`} />} />

        <div className={styles.navigation}>
          <Wrap>
            <Navigation
              links={[
                { to: '/charts/', text: 'Charts' },
                { to: '/about/', text: 'About Tjoonz' },
                { to: '/about/uploading/', text: 'About Uploading' },
                { to: '/about/contributing/', text: 'Become an Editor' },
                { to: '/thanks/', text: 'Special Thanks' },
                { to: '/privacy-policy/', text: 'Privacy Policy' },
                { to: '/about/feedback/', text: 'Feedback' }
              ]}
            />
          </Wrap>
        </div>

        <div className={styles.screens}>
          <Wrap observe>
            <Screens>
              <Route exact path='/' component={Home} />
              <Route path='/mix/:slug/' component={Mix} />
            </Screens>
          </Wrap>
          <Playlist />
        </div>

        <div className={styles.player}>
          <Wrap>
            <Player />
          </Wrap>
        </div>

      </Router>
    </ResizeObserverProvider>
  </StoreProvider>
);

export default App;
