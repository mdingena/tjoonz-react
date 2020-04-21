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
  quality,
  fileSize
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
        <div>Quality</div>
        <div>{quality} <small>kbps</small></div>
        <div>File size</div>
        <div>{fileSize} <small>MB</small></div>
      </div>
    </div>
  );
};

MixDetails.propTypes = {
  empty: PropTypes.bool,
  slug: PropTypes.string,
  thumbnail: PropTypes.string,
  poster: PropTypes.string,
  published: PropTypes.string,
  artists: PropTypes.string,
  title: PropTypes.string,
  genres: PropTypes.string,
  tags: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
  plays: PropTypes.number,
  downloads: PropTypes.number,
  quality: PropTypes.number,
  fileSize: PropTypes.number
};

export default MixDetails;
