import React from 'react';
import StoreProvider from './providers/StoreProvider';
import ResizeObserverProvider from './providers/ResizeObserverProvider';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Screens from './screens';
import Wrap from './components/Wrap';
import Navigation from './components/Navigation';
import Listen from './screens/Listen';
import styles from './App.module.css';

const Home = () => <div>Home screen</div>;

const App = () => (
  <StoreProvider>
    <ResizeObserverProvider>
      <Router>
        <Route path='/:url*' exact strict render={props => <Redirect to={`${props.location.pathname}/`} />} />

        <div className={styles.navigation}>
          <Wrap>
            <Navigation
              links={[
                { to: '/listen/', text: 'Listen' },
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

        <Wrap>
          <div className={styles.screens}>
            <Screens>
              <Route exact path='/' component={Home} />
              <Route path='/listen/' component={Listen} />
            </Screens>
          </div>
        </Wrap>

        <div className='player'>Player</div>

      </Router>
    </ResizeObserverProvider>
  </StoreProvider>
);

export default App;
