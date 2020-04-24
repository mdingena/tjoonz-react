import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import { columns, breakpoints } from '../MixListItem/MixListItem';
import styles from './MixListHeader.module.css';

const MixListHeader = () => {
  return (
    <Observe
      box='content-box'
      breakpoints={{ widths: breakpoints }}
      render={({ observedElementProps, widthMatch = 1 }) => (
        <div className={styles.root} {...observedElementProps}>
          <div className={widthMatch < 3 ? styles.noControls : styles.controls} />
          <div className={columns[widthMatch]}>
            <div hidden={widthMatch < 2}>
              Artists
            </div>
            <div>
              Title
            </div>
            <div hidden={widthMatch < 4}>
              Labels
            </div>
            <div hidden={widthMatch < 3}>
              Published
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default MixListHeader;
