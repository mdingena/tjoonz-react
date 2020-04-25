import React from 'react';
import { useHistory } from 'react-router-dom';
import { Observe } from '@envato/react-breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import appendPlaylistItems from '../../actions/appendPlaylistItems';
import removePlaylistItems from '../../actions/removePlaylistItems';
import resumePlayback from '../../actions/resumePlayback';
import pausePlayback from '../../actions/pausePlayback';
import startPlayback from '../../actions/startPlayback';
import setPlayhead from '../../actions/setPlayhead';
import openDrawer from '../../actions/openDrawer';
import closeDrawer from '../../actions/closeDrawer';
import setDetails from '../../actions/setDetails';
import { RESULT_DETAILS_DRAWER } from '../../constants/drawers';
import Icon from '../Icon';
import he from 'he';
import PropTypes from 'prop-types';
import styles from './MixListItem.module.css';

export const columns = {
  1: styles.oneColumn,
  2: styles.twoColumns,
  3: styles.threeColumns,
  4: styles.fourColumns
};

export const breakpoints = {
  0: 1,
  360: 2,
  460: 3,
  630: 4
};

const MixListItem = ({
  shownInPlaylist = false,
  detailsInDrawer = false,
  id,
  slug,
  thumbnail,
  title,
  artists,
  genres,
  tags,
  published
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPlaying, playlist, playhead } = useSelector(selectPlayer);

  const playlistIndex = playlist.findIndex(item => item.id === id);
  const isTrackAtPlayhead = (playlist[playhead] || {}).id === id;

  const handlePlaybackClick = () => {
    let action;

    if (isTrackAtPlayhead) {
      if (isPlaying) {
        action = pausePlayback();
      } else {
        action = resumePlayback();
      }
    } else {
      if (playlistIndex === -1) {
        action = startPlayback(id);
      } else {
        action = setPlayhead(playlistIndex);
      }
    }

    dispatch(action);
  };

  const handlePlaylistClick = () => {
    let action;

    if (playlistIndex === -1) {
      action = appendPlaylistItems([id]);
    } else {
      action = removePlaylistItems([id]);
    }

    dispatch(action);
  };

  const handleClick = columns => {
    if (shownInPlaylist) {
      if (columns < 3) {
        const action = setPlayhead(playlistIndex);
        dispatch(action);
      } else {
        const action = closeDrawer();
        dispatch(action);
        history.push(`/mix/${slug}/`);
      }
    } else {
      if (detailsInDrawer) {
        const drawerAction = openDrawer(RESULT_DETAILS_DRAWER);
        dispatch(drawerAction);
      }

      const detailsAction = setDetails(id);
      dispatch(detailsAction);
    }
  };

  const fallbackThumbnail = 'data:image/gif;base64,R0lGODlhRABEAKUyAB4iKB4jKB4jKR8jKR8kKR8kKiAkKiAlKyElKyElLCEmKyEmLCEmLSImLCImLSInLCInLSInLiMnLSMnLiMoLiMoLyQoLyQpLyQpMCUpMCUqMCUqMTxDSz1DTD1ETD1ETVRdZ1RdaFReZ1ReaFVeaFVeaVVfaVZfalZgalZga1dga1dha297h297iHB8iHB8iYuZp4uZqP///////////////////////////////////////////////////////yH5BAEKAD8ALAAAAABEAEQAAAb+wI1wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq9TM5i8fo/RHPF8fH5ggReGhnwZQ4WHF4ldGnoXFZQUlpaUFo55kXmTlZcUmZsYW50rMamqq6kwKhZ5sKistDGveYpZnrW0MBEUFhYVF7y0v7ClWJEXH8WrLhATFaIezqov0cN9WHkVKtYxMCULEBITEyjgMSbkwHlXyxTqMAYJENER6jH1EO7JVd2+gSNhAIEDBxLSDSzoYAKyKxgmKXQGI0RBcg5OqCOIoB+sXHcwWJAHDsaAeuQg6Dtpj4KjQVS6pSgJ4uSCBRnVhbAJocL+uyrxJhaDAYLAAYMMNIILYbSBtJ8xMVSYMC/AxQcN9Fnt6A7mlG5CeRE9qQCnUms7DZDz+W9KvHkAjCZwwEBf3AMN2Vrp1kEdCwEoH3BQ1wJwy5d7pYatNfaAAgY5lw44sCCCXqARSVqDEaAAgrkOtHpu+DGxN3U11S54sLhW2naIAUqdCU5EAcoMIJx1NuJ25cuyK8xj+QBCaHUsPWIAGVWgNYKUIUSg/dwAZctQg0+AsOCAgQEDAogPMICAdXLmtnP3Dn48efPR/XETSSGCg+7eDejXf5TcBFGW2Ifffvv1lw0nynRTH3c3JYDAZzc50M8wFQiz4E0LOAghThNdOsJcYpNQMEEE95R4TwT/aQNLiCOaWCKKomzChSSUTBNKjaRsQCMol+Cohxd8NILIHiAFKeQjX2gASCB6eCWEkkzu4aQdVFZp5ZVYZqnlllx26eWXYIYp5phkshEEADs=';
  const labels = he.decode([...genres.map(({ name }) => name), ...tags.map(({ name }) => name)].join(', '));

  return (
    <Observe
      box='content-box'
      breakpoints={{ widths: breakpoints }}
      render={({ observedElementProps, widthMatch = 1 }) => (
        <div className={styles.root} {...observedElementProps}>
          <div className={styles.controls}>
            <div className={styles.thumbnail}>
              <img src={thumbnail || fallbackThumbnail} alt='' loading='lazy' width={34} height={34} />
            </div>
            <button
              className={styles.play}
              onClick={handlePlaybackClick}
              title={isTrackAtPlayhead && isPlaying ? 'Pause' : 'Play now'}
              hidden={widthMatch < 3}
            >
              {isTrackAtPlayhead && isPlaying
                ? <Icon.Pause className={styles.icon} />
                : <Icon.Play className={styles.icon} />}
            </button>
            <button
              className={styles.queue}
              onClick={handlePlaylistClick}
              title='Add to playlist'
              hidden={widthMatch < 3}
            >
              {playlistIndex === -1
                ? <Icon.Square className={styles.icon} />
                : <Icon.CheckSquare className={styles.icon} />}
            </button>
          </div>
          <button
            className={styles.details}
            onClick={() => handleClick(widthMatch)}
            type='button'
          >
            <div className={columns[widthMatch]}>
              <div className={styles.artists} hidden={widthMatch < 2}>
                {artists.map(({ name }) => name).join(', ')}
              </div>
              <div className={styles.title}>
                {title}
              </div>
              <div className={styles.labels} hidden={widthMatch < 4}>
                {labels}
              </div>
              <div className={styles.published} hidden={widthMatch < 3}>
                {published}
              </div>
            </div>
          </button>
        </div>
      )}
    />
  );
};

MixListItem.propTypes = {
  shownInPlaylist: PropTypes.bool,
  detailsInDrawer: PropTypes.bool,
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  })).isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  })).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  })),
  published: PropTypes.string.isRequired
};

export default MixListItem;
