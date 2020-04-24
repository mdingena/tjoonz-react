import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import selectPlayer from '../../selectors/selectPlayer';
import { BASE_STREAM_URL } from '../../constants/api';

const Audio = () => {
  const ref = useRef();
  const loadedId = useRef(0);

  const { isPlaying, volumeLevel, playlist, playhead } = useSelector(selectPlayer);
  const trackAtPlayhead = playlist[playhead];

  const handleBuffering = () => {
    if (ref.current.buffered.length > 0 && ref.current.duration) {
      let percentLoaded =
        ref.current.buffered.end(ref.current.buffered.length - 1) /
        ref.current.duration;
      percentLoaded = percentLoaded > 1 ? 1 : percentLoaded;

      console.log('buffering', percentLoaded);
    }
  };

  useEffect(() => {
    if (ref.current) {
      if (!trackAtPlayhead) {
        ref.current.pause();
      } else {
        const wasPlaying =
          ref.current.currentTime > 0 &&
          !ref.current.paused &&
          !ref.current.ended &&
          ref.current.readyState > 2;

        if (!isPlaying && wasPlaying) {
          ref.current.pause();
        } else if (isPlaying) {
          if (trackAtPlayhead.id !== loadedId.current) {
            ref.current.load();
            loadedId.current = trackAtPlayhead.id;
          }
          ref.current.play();
        }
      }
    }
  }, [isPlaying, trackAtPlayhead]);

  return (
    <audio
      ref={ref}
      preload='metadata'
      onPlay={() => console.log('onPlay event')}
      onPause={() => console.log('onPause event')}
      onProgress={handleBuffering}
    >
      {trackAtPlayhead && <source src={`${BASE_STREAM_URL}${trackAtPlayhead.id}`} type='audio/mpeg' />}
    </audio>
  );
};

export default Audio;
