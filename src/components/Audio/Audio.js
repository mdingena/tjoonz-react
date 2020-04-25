import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addTasks from '../../actions/addTasks';
import completeTasks from '../../actions/completeTasks';
import selectPlayer from '../../selectors/selectPlayer';
import { BASE_STREAM_URL } from '../../constants/api';

const Audio = ({ isDragging, scrubTo, onBufferProgress, onPlaybackProgress }) => {
  const dispatch = useDispatch();

  const audioRef = useRef();
  const isDraggingRef = useRef(false);
  const isPlayingRef = useRef(false);
  const loadedId = useRef(0);

  const { isPlaying, playlist, playhead } = useSelector(selectPlayer);
  const trackAtPlayhead = playlist[playhead];

  const handleBuffering = () => {
    if (audioRef.current.buffered.length > 0 && audioRef.current.duration) {
      let progress = audioRef.current.buffered.end(audioRef.current.buffered.length - 1) / audioRef.current.duration;
      progress = progress > 1 ? 1 : progress;
      onBufferProgress(progress);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      window.requestAnimationFrame(handlePlaybackProgress);
    }
  };

  const handlePlaybackProgress = () => {
    if (isPlayingRef.current) {
      if (!isDraggingRef.current && audioRef.current) {
        const progress = audioRef.current.currentTime / audioRef.current.duration;
        onPlaybackProgress(progress);
      }

      window.requestAnimationFrame(handlePlaybackProgress);
    }
  };

  const showSpinner = () => {
    const action = addTasks('audio', 1);
    dispatch(action);
  };

  const hideSpinner = () => {
    const action = completeTasks('audio', 1);
    dispatch(action);
  };

  const handleLoadStart = () => isPlaying && showSpinner();

  const handleLoadedData = () => hideSpinner();

  const handleAbort = () => hideSpinner();

  useEffect(() => {
    // Set ref'd state, so that our handlePlaybackProgress callback uses the correct state.
    isPlayingRef.current = isPlaying;
    isDraggingRef.current = isDragging;
  }, [isDragging, isPlaying]);

  useEffect(() => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime = scrubTo * audioRef.current.duration;
    }
  }, [scrubTo]);

  useEffect(() => {
    if (audioRef.current) {
      if (!trackAtPlayhead) {
        audioRef.current.pause();
      } else {
        const wasPlaying =
          audioRef.current.currentTime > 0 &&
          !audioRef.current.paused &&
          !audioRef.current.ended &&
          audioRef.current.readyState >= 2;

        if (!isPlaying && wasPlaying) {
          audioRef.current.pause();
        } else if (isPlaying) {
          if (trackAtPlayhead.id !== loadedId.current) {
            /** @todo
             * Figure out how to avoid interrupting the play() request by a new load request.
             * https://goo.gl/LdLk22
            */
            audioRef.current.load();
            loadedId.current = trackAtPlayhead.id;
          }
          audioRef.current.play();
        }
      }
    }
  }, [isPlaying, trackAtPlayhead]);

  return (
    <audio
      ref={audioRef}
      preload='none'
      onPlay={handlePlay}
      onProgress={handleBuffering}
      onLoadStart={handleLoadStart}
      onLoadedData={handleLoadedData}
      onAbort={handleAbort}
    >
      {trackAtPlayhead && <source src={`${BASE_STREAM_URL}${trackAtPlayhead.id}`} type='audio/mpeg' />}
    </audio>
  );
};

export default Audio;
