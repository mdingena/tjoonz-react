import React, { useRef, useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import selectDrawer from '../../selectors/selectDrawer';
import resumePlayback from '../../actions/resumePlayback';
import pausePlayback from '../../actions/pausePlayback';
import skipBackward from '../../actions/skipBackward';
import skipForward from '../../actions/skipForward';
import openDrawer from '../../actions/openDrawer';
import closeDrawer from '../../actions/closeDrawer';
import { PLAYLIST_DRAWER } from '../../constants/drawers';
import Icon from '../Icon';
import VolumeControl from '../VolumeControl';
import Audio from '../Audio';
import { clamp } from '../../utils';
import he from 'he';
import styles from './Player.module.css';

const getDragPosition = event => {
  const target = event.nativeEvent.target;
  const targetClientX = target.getBoundingClientRect().left;

  if ('touches' in event.nativeEvent && event.nativeEvent.target instanceof window.HTMLElement) {
    const touch = event.nativeEvent.touches[0];
    return touch.clientX - targetClientX;
  }

  if ('offsetX' in event.nativeEvent) {
    const mouse = event.nativeEvent;
    return mouse.clientX - targetClientX;
  }

  return 0;
};

const Player = () => {
  const scrubberRef = useRef(null);

  const [posterRevealed, revealPoster] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { isPlaying, playlist, playhead } = useSelector(selectPlayer);
  const drawer = useSelector(selectDrawer);

  const hasTrackAtPlayhead = playlist[playhead];
  const isPlaylistDrawer = drawer && drawer.KEY === PLAYLIST_DRAWER.KEY;

  const {
    slug,
    thumbnail,
    poster,
    title,
    artists,
    genres,
    tags
  } = (playlist[playhead] || {});

  const handlePosterLoaded = () => revealPoster(true);
  const routeMatch = useRouteMatch({ path: `/mix/${slug}/` });

  useEffect(() => {
    revealPoster(false);
  }, [poster]);

  const handlePlaybackClick = () => {
    let action;

    if (hasTrackAtPlayhead) {
      if (isPlaying) {
        action = pausePlayback();
      } else {
        action = resumePlayback();
      }

      dispatch(action);
    }
  };

  const handleSkipBackwardClick = () => {
    const action = skipBackward();
    dispatch(action);
  };

  const handleSkipForwardClick = () => {
    const action = skipForward();
    dispatch(action);
  };

  const handlePlaybackProgress = progress => setPlaybackProgress(progress);

  const handleDragStart = event => {
    if (hasTrackAtPlayhead) {
      const progress = getDragPosition(event) / (scrubberRef.current.clientWidth - 11);
      setPlaybackProgress(clamp(progress, 0, 1));
      setDragging(true);
    }
  };

  const handleDrag = event => {
    if (isDragging) {
      const progress = getDragPosition(event) / (scrubberRef.current.clientWidth - 11);
      setPlaybackProgress(clamp(progress, 0, 1));
    }
  };

  const handleDragEnd = event => {
    event.preventDefault();
    setDragging(false);
    setScrubPosition(playbackProgress);
  };

  const handleContextMenu = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleOpenDrawer = () => {
    const drawerAction = openDrawer(PLAYLIST_DRAWER);
    dispatch(drawerAction);
  };

  const handleCloseDrawer = () => {
    const action = closeDrawer();
    dispatch(action);
  };

  const handleNavigate = () => {
    history.push(`/mix/${slug}/`);
  };

  return (
    <>
      <div className={styles.root}>
        <div
          ref={scrubberRef}
          className={hasTrackAtPlayhead ? styles.scrubber : styles.noScrubber}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDrag}
          onTouchEnd={handleDragEnd}
          onContextMenu={handleContextMenu}
        >
          <div
            className={styles.progress}
            style={{ width: `${playbackProgress * 100}%` }}
          />
        </div>
        <button
          className={styles.poster}
          onClick={handleNavigate}
          disabled={!slug || routeMatch}
        >
          <div className={posterRevealed ? styles.posterRevealed : styles.posterLoading}>
            {poster
              ? (
                <>
                  <img key={thumbnail} src={thumbnail} alt={title} />
                  <img key={poster} src={poster} alt={title} onLoad={handlePosterLoaded} />
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
        </button>
        <div className={styles.details}>
          <div className={styles.title}>
            {title}
          </div>
          {slug && (
            <div className={styles.artists}>
              {he.decode(artists.map(({ name }) => name).join(', '))}
            </div>
          )}
          {slug && (
            <div className={styles.labels}>
              {he.decode([
                ...genres.map(({ name }) => name),
                ...tags.map(({ name }) => name)
              ].join(', '))}
            </div>
          )}
        </div>
        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={handleSkipBackwardClick}
            title='Skip backward'
          >
            <Icon.Backward className={styles.icon} />
          </button>
          <button
            className={styles.button}
            onClick={handlePlaybackClick}
            title={hasTrackAtPlayhead && isPlaying ? 'Pause' : 'Play'}
          >
            {hasTrackAtPlayhead && isPlaying
              ? <Icon.Pause className={styles.icon} />
              : <Icon.Play className={styles.icon} />}
          </button>
          <button
            className={styles.button}
            onClick={handleSkipForwardClick}
            title='Skip forward'
          >
            <Icon.Forward className={styles.icon} />
          </button>
          <div className={styles.volume}>
            <VolumeControl />
          </div>
        </div>
        <button
          className={styles.button}
          onClick={isPlaylistDrawer ? handleCloseDrawer : handleOpenDrawer}
          title='Playlist'
        >
          <Icon.ListMusic className={styles.icon} />
        </button>
      </div>
      <Audio
        isDragging={isDragging}
        scrubTo={scrubPosition}
        onPlaybackProgress={handlePlaybackProgress}
      />
    </>
  );
};

export default Player;
