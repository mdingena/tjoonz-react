import React from 'react';
import { Observe } from '@envato/react-breakpoints';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './MixListItem.module.css';

const MixListItem = ({
  thumbnail,
  title,
  artists,
  labels,
  url,
  published
}) => (
  <Observe
    box='content-box'
    breakpoints={{
      widths: {
        0: styles.threeColumns,
        530: styles.fourColumns
      }
    }}
    render={({ observedElementProps, widthMatch = styles.threeColumns }) => (
      <div className={styles.root}>
        <div className={styles.controls}>
          <div className={styles.thumbnail}>
            <img src={thumbnail} alt={`${title} by ${artists}`} />
          </div>
          <button className={styles.play} title='Play now'>
            <Icon.Play className={styles.icon} />
          </button>
          <button className={styles.queue} title='Add to playlist'>
            <Icon.Square className={styles.icon} />
            <Icon.PlusSquare className={styles.icon} />
          </button>
        </div>
        <Link
          to={url}
          className={widthMatch}
          {...observedElementProps}
        >
          <div className={styles.artists}>
            {artists}
          </div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.labels}>
            {labels}
          </div>
          <div className={styles.published}>
            {published}
          </div>
        </Link>
      </div>
    )}
  />
);

MixListItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired
};

export default MixListItem;
