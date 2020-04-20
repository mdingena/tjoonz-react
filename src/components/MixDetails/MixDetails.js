import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './MixDetails.module.css';

const MixDetails = ({
  slug,
  thumbnail,
  poster,
  published,
  artists,
  title,
  genres,
  tags,
  duration,
  description,
  plays,
  downloads,
  bitrate,
  filesize
}) => {
  const [posterRevealed, revealPoster] = useState(false);

  const handlePosterLoaded = () => revealPoster(true);

  return (
    <div className={styles.root}>
      <div className={posterRevealed ? styles.posterRevealed : styles.posterLoading}>
        <img src={thumbnail} alt={title} />
        <img src={poster} alt={title} onLoad={handlePosterLoaded} />
      </div>
      <div className={styles.controls}>
        <Button
          onClick={() => console.log('play')}
          text='Play'
          Icon={Icon.Play}
        />
        <Button
          onClick={() => console.log('queue')}
          text='Queue'
          Icon={Icon.Square}
        />
        <Button
          onClick={() => console.log('download')}
          text='Download'
          Icon={Icon.CloudDownload}
        />
      </div>
      <Link to={`/mix/${slug}/`} className={styles.link}>
        <Icon.ListOl className={styles.icon} />
        <span className={styles.text}>Tracklist and comments</span>
      </Link>
      <div className={styles.details}>
        <div>Published</div>
        <div>{published}</div>
        <div>Artists</div>
        <div>{artists}</div>
        <div>Title</div>
        <div>{title}</div>
        <div>Genres</div>
        <div>{genres}</div>
        <div>Tags</div>
        <div>{tags}</div>
        <div>Duration</div>
        <div>{duration}</div>
      </div>
      <div className={styles.description}>
        {description}
      </div>
      <div className={styles.meta}>
        <div>Plays</div>
        <div>{plays}</div>
        <div>Downloads</div>
        <div>{downloads}</div>
        <div>Bit rate</div>
        <div>{bitrate} <small>kbps</small></div>
        <div>File size</div>
        <div>{filesize} <small>MB</small></div>
      </div>
    </div>
  );
};

MixDetails.propTypes = {
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  plays: PropTypes.number.isRequired,
  downloads: PropTypes.number.isRequired,
  bitrate: PropTypes.number.isRequired,
  filesize: PropTypes.number.isRequired
};

export default MixDetails;
