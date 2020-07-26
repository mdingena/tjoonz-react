import React from 'react';
import { useBreakpoints } from '@envato/react-breakpoints';
import { grid, breakpoints } from '../MixListItem/MixListItem';
import styles from './MixListHeader.module.css';

const MixListHeader = () => {
  const [columns] = useBreakpoints({
    box: 'content-box',
    widths: breakpoints
  });

  if (!columns) return null;

  return (
    <div className={styles.root}>
      <div className={columns < 3 ? styles.noControls : styles.controls} />
      <div className={grid[columns]}>
        <div hidden={columns < 2}>Artists</div>
        <div>Title</div>
        <div hidden={columns < 4}>Labels</div>
        <div hidden={columns < 3}>Published</div>
      </div>
    </div>
  );
};

export default MixListHeader;
