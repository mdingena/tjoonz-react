import React from 'react';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import ProgressBar from '../ProgressBar';
import styles from './Logo.module.css';

const Logo = () => (
  <NavLink to='/' className={styles.root}>
    <LoadingSpinner size={32} />
    <div className={styles.column}>
      <span className={styles.text}>Tjoonz.com</span>
      <div className={styles.progressBar}>
        <ProgressBar />
      </div>
    </div>
  </NavLink>
);

export default Logo;
