import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import selectAuth from '../../selectors/selectAuth';
import selectMixVoting from '../../selectors/selectMixVoting';
import appendPlaylistItems from '../../actions/appendPlaylistItems';
import removePlaylistItems from '../../actions/removePlaylistItems';
import resumePlayback from '../../actions/resumePlayback';
import pausePlayback from '../../actions/pausePlayback';
import startPlayback from '../../actions/startPlayback';
import closeDrawer from '../../actions/closeDrawer';
import submitVote from '../../actions/submitVote';
import Button from '../Button';
import Icon from '../Icon';
import CollectionPicker from '../CollectionPicker';
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
  likes,
  dislikes,
  quality,
  fileSize
}) => {
  const routeMatch = useRouteMatch({ path: `/mix/${slug}/` });
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isPlaying, playlist, playhead } = useSelector(selectPlayer);
  const { token } = useSelector(selectAuth);
  const isVoting = useSelector(selectMixVoting);
  const [showCollectionPicker, setShowCollectionPicker] = useState(false);

  const isInPlaylist = !empty && playlist.find(item => item.id === id);
  const isTrackAtPlayhead = !empty && (playlist[playhead] || {}).id === id;

  const handleSignIn = useCallback(() => {
    history.push('/sign-in/', { from: location.pathname });
  }, [history, location.pathname]);

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
    setShowCollectionPicker(false);
  }, [id]);

  useEffect(() => {
    revealPoster(false);
  }, [thumbnail]);

  useEffect(() => {
    if (!posterRevealed && posterRef.current && posterRef.current.complete) handlePosterLoaded();
  });

  const handleVote = liked => {
    const action = submitVote(liked, id, slug);

    dispatch(action);
  };

  const score = likes - dislikes;

  return (
    <div className={routeMatch ? styles.root : styles.drawer}>
      <div className={posterRevealed ? styles.posterRevealed : styles.posterLoading}>
        {!empty && poster ? (
          <>
            <img key={thumbnail} src={thumbnail} alt={title} />
            <img ref={posterRef} key={poster} src={poster} alt={title} onLoad={handlePosterLoaded} />
          </>
        ) : (
          <div className={styles.logo}>
            <div>
              <div />
              <div />
            </div>
          </div>
        )}
      </div>
      {token && showCollectionPicker ? (
        <CollectionPicker mixId={id} onClose={() => setShowCollectionPicker(false)} />
      ) : (
        <>
          {!empty && (
            <div className={styles.controls}>
              {token && (
                <div className={styles.voting}>
                  {!empty && token && (
                    <>
                      <Button
                        onClick={() => handleVote(true)}
                        text='Like'
                        Icon={Icon.AngleDoubleUp}
                        disabled={isVoting}
                      />
                      <div className={styles.score}>{`${score < 0 ? '' : '+'}${score.toLocaleString()}`}</div>
                      <Button
                        onClick={() => handleVote(false)}
                        text='Dislike'
                        Icon={Icon.AngleDoubleDown}
                        disabled={isVoting}
                      />
                    </>
                  )}
                </div>
              )}
              <div className={token ? styles.splitControls : styles.spanControls}>
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
                <Button onClick={() => console.log('todo')} text='Download' Icon={Icon.CloudDownload} />
                {token && <Button onClick={() => setShowCollectionPicker(true)} text='Save' Icon={Icon.Save} />}
              </div>
            </div>
          )}
          {!empty && !token && (
            <Button onClick={handleSignIn} text='Sign in to vote and collect' Icon={Icon.ShieldCheck} />
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
            {!empty ? (
              description
            ) : (
              <>
                <h1>Tjoonz.com</h1>
                <p>
                  An EDM mixtape archive launched in 2008, run entirely in our spare time and out of our own pockets.
                </p>
              </>
            )}
          </div>
          {!empty && (
            <div className={styles.meta}>
              <div>Plays</div>
              <div>{plays}</div>
              <div>Downloads</div>
              <div>{downloads}</div>
              <div>Likes</div>
              <div>{likes}</div>
              <div>Dislikes</div>
              <div>{dislikes}</div>
              {quality > 0 && (
                <>
                  <div>Quality</div>
                  <div>
                    {quality} <small>kbps</small>
                  </div>
                </>
              )}
              {fileSize > 0 && (
                <>
                  <div>File size</div>
                  <div>
                    {fileSize} <small>MB</small>
                  </div>
                </>
              )}
            </div>
          )}
        </>
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
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  title: PropTypes.string,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  duration: PropTypes.string,
  description: PropTypes.string,
  plays: PropTypes.number,
  downloads: PropTypes.number,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  quality: PropTypes.number,
  fileSize: PropTypes.number
};

export default MixDetails;
