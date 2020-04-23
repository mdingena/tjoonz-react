import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import appendPlaylistItems from '../../actions/appendPlaylistItems';
import removePlaylistItems from '../../actions/removePlaylistItems';
import resumePlayback from '../../actions/resumePlayback';
import pausePlayback from '../../actions/pausePlayback';
import startPlayback from '../../actions/startPlayback';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import styles from './MixDetails.module.css';

const MixDetails = ({
  empty = false,
  id,
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
  const dispatch = useDispatch();
  const { isPlaying, playlist, playhead } = useSelector(selectPlayer);

  const isInPlaylist = !empty && playlist.find(item => item.id === id);
  const isTrackAtPlayhead = !empty && (playlist[playhead] || {}).id === id;

  const handlePlaybackClick = () => {
    let action;

    if (isTrackAtPlayhead) {
      if (isPlaying) {
        action = pausePlayback();
      } else {
        action = resumePlayback();
      }
    } else {
      action = startPlayback(id);
    }

    dispatch(action);
  };

  const handlePlaylistClick = () => {
    let action;

    if (isInPlaylist) {
      action = removePlaylistItems([id]);
    } else {
      action = appendPlaylistItems([id]);
    }

    dispatch(action);
  };

  const [posterRevealed, revealPoster] = useState(false);

  const handlePosterLoaded = () => revealPoster(true);

  useEffect(() => {
    revealPoster(false);
  }, [thumbnail]);

  return (
    <div className={styles.root}>
      <div className={posterRevealed ? styles.posterRevealed : styles.posterLoading}>
        {!empty && poster
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
            onClick={handlePlaybackClick}
            text={isTrackAtPlayhead && isPlaying ? 'Pause' : 'Play'}
            Icon={isTrackAtPlayhead && isPlaying ? Icon.Pause : Icon.Play}
          />
          <Button
            onClick={handlePlaylistClick}
            text='Queue'
            Icon={isInPlaylist ? Icon.CheckSquare : Icon.Square}
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
          {tags && (
            <>
              <div>Tags</div>
              <div>{tags}</div>
            </>
          )}
          {duration && (
            <>
              <div>Duration</div>
              <div>{duration}</div>
            </>
          )}
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
          {plays && (
            <>
              <div>Plays</div>
              <div>{plays}</div>
            </>
          )}
          {downloads && (
            <>
              <div>Downloads</div>
              <div>{downloads}</div>
            </>
          )}
          {quality && (
            <>
              <div>Quality</div>
              <div>{quality} <small>kbps</small></div>
            </>
          )}
          {fileSize && (
            <>
              <div>File size</div>
              <div>{fileSize} <small>MB</small></div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

MixDetails.propTypes = {
  empty: PropTypes.bool,
  id: PropTypes.number,
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
