import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import appendPlaylistItems from '../../actions/appendPlaylistItems';
import removePlaylistItems from '../../actions/removePlaylistItems';
import openDrawer from '../../actions/openDrawer';
import setDetails from '../../actions/setDetails';
import { RESULT_DETAILS_DRAWER } from '../../constants/drawers';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './MixListItem.module.css';

const columns = {
  1: styles.oneColumn,
  2: styles.twoColumns,
  3: styles.threeColumns,
  4: styles.fourColumns
};

const MixListItem = ({
  detailsInDrawer = false,
  id,
  thumbnail,
  title,
  artists,
  genres,
  tags,
  published
}) => {
  const dispatch = useDispatch();
  const { playlist } = useSelector(selectPlayer);

  const isInPlaylist = playlist.find(item => item.id === id);

  const handlePlaylistClick = () => {
    let action;

    if (isInPlaylist) {
      action = removePlaylistItems([id]);
    } else {
      action = appendPlaylistItems([id]);
    }

    dispatch(action);
  };

  const handleOpenDrawer = () => {
    if (detailsInDrawer) {
      const drawerAction = openDrawer(RESULT_DETAILS_DRAWER);
      dispatch(drawerAction);
    }

    const detailsAction = setDetails(id);
    dispatch(detailsAction);
  };

  const labels = [genres, tags].join(', ');

  return (
    <Observe
      box='content-box'
      breakpoints={{
        widths: {
          0: 1,
          360: 2,
          460: 3,
          630: 4
        }
      }}
      render={({ observedElementProps, widthMatch = 1 }) => (
        <div className={styles.root} {...observedElementProps}>
          <div className={styles.controls}>
            <div className={styles.thumbnail}>
              <img src={thumbnail} alt={`${title} by ${artists}`} loading='lazy' width={34} height={34} />
            </div>
            <button className={styles.play} title='Play now' hidden={widthMatch < 3}>
              <Icon.Play className={styles.icon} />
            </button>
            <button
              className={styles.queue}
              onClick={handlePlaylistClick}
              title='Add to playlist'
              hidden={widthMatch < 3}
            >
              {isInPlaylist
                ? <Icon.CheckSquare className={styles.icon} />
                : <Icon.Square className={styles.icon} />}
            </button>
          </div>
          <button
            className={styles.details}
            onClick={handleOpenDrawer}
            type='button'
          >
            <div className={columns[widthMatch]}>
              <div className={styles.artists} hidden={widthMatch < 2}>
                {artists}
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
  detailsInDrawer: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired
};

export default MixListItem;
