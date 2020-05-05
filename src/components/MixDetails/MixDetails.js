import React, { useRef, useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import appendPlaylistItems from '../../actions/appendPlaylistItems';
import removePlaylistItems from '../../actions/removePlaylistItems';
import resumePlayback from '../../actions/resumePlayback';
import pausePlayback from '../../actions/pausePlayback';
import startPlayback from '../../actions/startPlayback';
import closeDrawer from '../../actions/closeDrawer';
import Button from '../Button';
import Icon from '../Icon';
import he from 'he';
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
  const routeMatch = useRouteMatch({ path: `/mix/${slug}/` });
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

  const handleTracklistClick = () => {
    const action = closeDrawer();
    dispatch(action);
  };

  const posterRef = useRef();
  const [posterRevealed, revealPoster] = useState(false);

  const handlePosterLoaded = () => revealPoster(true);

  useEffect(() => {
    revealPoster(false);
  }, [thumbnail]);

  useEffect(() => {
    if (!posterRevealed && posterRef.current && posterRef.current.complete) handlePosterLoaded();
  });

  return (
    <div className={routeMatch ? styles.root : styles.drawer}>
      <div className={posterRevealed ? styles.posterRevealed : styles.posterLoading}>
        {!empty && poster
          ? (
            <>
              <img key={thumbnail} src={thumbnail} alt={title} />
              <img ref={posterRef} key={poster} src={poster} alt={title} onLoad={handlePosterLoaded} />
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
      {!empty && !routeMatch && (
        <Link to={`/mix/${slug}/`} className={styles.link} onClick={handleTracklistClick}>
          <Icon.ListOl className={styles.icon} />
          <span className={styles.text}>Tracklist and comments</span>
        </Link>
      )}
      {!empty && (
        <div className={styles.details}>
          <div>Published</div>
          <div>{published}</div>
          <div>Artists</div>
          <div>{he.decode(artists.map(({ name }) => name).join(', '))}</div>
          <div>Title</div>
          <div>{title}</div>
          <div>Genres</div>
          <div>{he.decode(genres.map(({ name }) => name).join(', '))}</div>
          {tags.length > 0 && (
            <>
              <div>Tags</div>
              <div>{he.decode(tags.map(({ name }) => name).join(', '))}</div>
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
          <div>Plays</div>
          <div>{plays}</div>
          <div>Downloads</div>
          <div>{downloads}</div>
          {quality > 0 && (
            <>
              <div>Quality</div>
              <div>{quality} <small>kbps</small></div>
            </>
          )}
          {fileSize > 0 && (
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
  artists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  })),
  title: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  })),
  duration: PropTypes.string,
  description: PropTypes.string,
  plays: PropTypes.number,
  downloads: PropTypes.number,
  quality: PropTypes.number,
  fileSize: PropTypes.number
};

export default MixDetails;
