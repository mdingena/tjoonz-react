import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import styles from './Listen.module.css';

const Listen = () => (
  <Observe
    box='content-box'
    breakpoints={{
      box: 'content-box',
      widths: {
        0: styles.stack,
        1024: styles.spread
      }
    }}
    render={({ observedElementProps, widthMatch = styles.stack }) => (
      <div {...observedElementProps} className={widthMatch}>
        <div className={styles.search}>
          Search
        </div>
        <div className={styles.results}>
          Results
        </div>
        <div className={styles.details}>
          Details
        </div>
      </div>
    )}
  />
);

export default Listen;
