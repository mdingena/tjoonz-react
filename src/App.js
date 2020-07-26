import React from 'react';
import StoreProvider from './providers/StoreProvider';
import ResizeObserverProvider from './providers/ResizeObserverProvider';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Wrap from './components/Wrap';
import Navigation from './components/Navigation';
import Player from './components/Player';
import Playlist from './components/Playlist';
import Authenticate from './components/Authenticate';
import Analytics from './components/Analytics';
import Screens from './screens';
import Home from './screens/Home';
import Mix from './screens/Mix';
import SignIn from './screens/SignIn';
import SignOut from './screens/SignOut';
import NotFound from './screens/NotFound';
import Footer from './components/Footer';
import styles from './App.module.css';

const App = () => (
  <StoreProvider>
    <ResizeObserverProvider>
      <Helmet>
        <meta charset='utf-8' />
        <meta http-equiv='content-type' content='application/xhtml+xml' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
        <meta name='HandheldFriendly' content='True' />
        <meta name='MobileOptimized' content='320' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='noodp' />
        <meta name='theme-color' content='#13161a' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='Tjoonz.com' />
        <meta name='twitter:card' content='summary' />

        <title>Tjoonz.com | Get your low-frequency fix!</title>
        <meta property='og:title' content='Tjoonz.com | Get your low-frequency fix!' />
        <meta name='twitter:title' content='Tjoonz.com | Get your low-frequency fix!' />

        <meta
          name='description'
          content='An EDM mixtape archive launched in 2008, run entirely in our spare time and out of our own pockets. Enjoy over 2,500 hour-long bass music sets.'
        />
        <meta
          property='og:description'
          content='An EDM mixtape archive launched in 2008, run entirely in our spare time and out of our own pockets. Enjoy over 2,500 hour-long bass music sets.'
        />
        <meta
          name='twitter:description'
          content='An EDM mixtape archive launched in 2008, run entirely in our spare time and out of our own pockets. Enjoy over 2,500 hour-long bass music sets.'
        />

        <link rel='canonical' href='https://www.tjoonz.com' />
        <meta property='og:url' content='https://www.tjoonz.com' />
      </Helmet>
      <Router>
        <Route path='/:url*' exact strict render={props => <Redirect to={`${props.location.pathname}/`} />} />

        <div className={styles.navigation}>
          <Wrap>
            <Navigation />
          </Wrap>
        </div>

        <div className={styles.screens}>
          <Wrap observe>
            <Screens>
              <Route exact path='/' component={Home} />
              <Route path='/mix/:slug/' component={Mix} />
              <Route path='/sign-in/' component={SignIn} />
              <Route path='/sign-out/' component={SignOut} />
              <Route component={NotFound} />
            </Screens>
          </Wrap>
          <Footer
            links={[
              { to: '/about/', text: 'About' },
              { to: '/about/contributing/', text: 'Become an Editor' },
              { to: '/privacy-policy/', text: 'Privacy Policy' },
              { to: '/disclaimer/', text: 'Disclaimer' },
              { to: '/thanks/', text: 'Special Thanks' }
            ]}
          />
          <Playlist />
        </div>

        <div className={styles.player}>
          <Wrap>
            <Player />
          </Wrap>
        </div>

        <Analytics />
      </Router>
    </ResizeObserverProvider>
    <Authenticate />
  </StoreProvider>
);

export default App;
