import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import { useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import { PLAYLIST_DRAWER } from '../../constants/drawers';
import Drawer from '../Aside/Drawer';
import Button from '../Button';
import MixListHeader from '../MixListHeader';
import MixListItem from '../MixListItem';
import styles from './Playlist.module.css';

const Playlist = () => {
  const { playlist, playhead } = useSelector(selectPlayer);

  return (
    <Drawer drawerKey={PLAYLIST_DRAWER.KEY} align={PLAYLIST_DRAWER.ALIGN}>
      <Observe
        box='content-box'
        render={({ observedElementProps }) => (
          <div className={styles.root} {...observedElementProps}>
            {playlist.length === 0 ? (
              <Button text='Nothing in playlist' disabled />
            ) : (
              <>
                <div className={styles.item}>
                  <MixListHeader />
                </div>
                {playlist.map((item, index) => (
                  <div key={`playlist-${index}`} className={playhead === index ? styles.active : styles.item}>
                    <MixListItem shownInPlaylist mix={item} />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      />
    </Drawer>
  );
};

export default Playlist;
