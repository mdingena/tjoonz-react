import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './MixDetails.module.css';

const MixDetails = ({
  empty,
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

  useEffect(() => {
    revealPoster(false);
  }, [thumbnail]);

  return (
    <div className={styles.root}>
      <div className={posterRevealed ? styles.posterRevealed : styles.posterLoading}>
        {!empty
          ? (
            <>
              <img src={thumbnail} alt={title} />
              <img src={poster} alt={title} onLoad={handlePosterLoaded} />
            </>
          )
          : (
            <div className={styles.logo}>
              <div>
                <div />
                <div />
              </div>
            </div>
          )}
      </div>
      {!empty && (
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
      )}
      {!empty && (
        <Link to={`/mix/${slug}/`} className={styles.link}>
          <Icon.ListOl className={styles.icon} />
          <span className={styles.text}>Tracklist and comments</span>
        </Link>
      )}
      {!empty && (
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
      )}
      <div className={styles.description}>
        {!empty
          ? description
          : (
            <>
              <h1>Tjoonz.com</h1>
              <p>An EDM mixtape archive launched in 2008, run entirely in our spare time and out of our own pockets.</p>
            </>
          )}
      </div>
      {!empty && (
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
      )}
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
