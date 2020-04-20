import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import { useDispatch } from 'react-redux';
import openDrawer from '../../actions/openDrawer';
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
  slug,
  thumbnail,
  title,
  artists,
  labels,
  published
}) => {
  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    const action = openDrawer(RESULT_DETAILS_DRAWER);
    dispatch(action);
  };

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
              <img src={thumbnail} alt={`${title} by ${artists}`} loading='lazy' />
            </div>
            <button className={styles.play} title='Play now' hidden={widthMatch < 3}>
              <Icon.Play className={styles.icon} />
            </button>
            <button className={styles.queue} title='Add to playlist' hidden={widthMatch < 3}>
              <Icon.Square className={styles.icon} />
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
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired
};

export default MixListItem;
