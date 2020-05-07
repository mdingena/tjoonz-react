import React from 'react';
import MetaTags from '../../components/MetaTags';
import styles from './NotFound.module.css';

const NotFound = () => (
  <div className={styles.root}>
    <MetaTags title='Not Found | Tjoonz.com' />
    <h1>404 Not Found</h1>
    <p>Sorry, there's nothing here.</p>
  </div>
);

export default NotFound;
