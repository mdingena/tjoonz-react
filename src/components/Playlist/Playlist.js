import React from 'react';
import Drawer from '../Aside/Drawer';
import { PLAYLIST_DRAWER } from '../../constants/drawers';
import styles from './Playlist.module.css';

const Playlist = () => (
  <Drawer drawerKey={PLAYLIST_DRAWER.KEY} align={PLAYLIST_DRAWER.ALIGN}>
    <div className={styles.root}>Playlist</div>
  </Drawer>
);

export default Playlist;
